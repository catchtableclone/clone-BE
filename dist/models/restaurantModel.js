"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantModel = void 0;
const database_1 = require("../database/database");
const restaurantSelectQueries_1 = require("./restaurantSelectQueries");
class RestaurantModel {
    constructor(queryBuilder) {
        this.queryBuilder = queryBuilder;
    }
    getRestaurants(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            this.queryBuilder = new restaurantSelectQueries_1.RestaurantsSelectQueries(queryParams);
            const { whereClause, orderByClause, limitClause } = this.queryBuilder.constructQueries();
            return database_1.appDataSource.query(`
			SELECT DISTINCT
				r.id 															AS restaurantId,
				r.restaurateur_id 								AS restaurateurId,
				r.name														AS restaurantName,
				r.thumbnail_img										AS img,
				r.avg_price 											AS price,
				r.created_at											AS createdAt,
				cc.category 											AS cuisineName,
				JSON_OBJECT(
					"lat", r.lat,
					"lng", r.lng
				)																	AS coordinates
			FROM restaurants r
			INNER JOIN cuisine_categories cc 		ON r.cuisine_id = cc.id
			${whereClause}
			${orderByClause}
			${limitClause};
		`);
        });
    }
    getRestaurantDetail(restaurantId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.appDataSource.query(`
			SELECT DISTINCT
				r.id 																			AS restaurantId,
				r.restaurateur_id 												AS restaurateurId,
				r.name																		AS restaurantName,
				r.thumbnail_img 													AS img,

					
				JSON_OBJECT(
					"telephone", 			r.telephone,
					"email", 					r.email,
					"address", 				r.full_address
				)																					AS contactInfo,
				
				JSON_OBJECT(
					"lng", 						r.lng,
					"lat", 						r.lat
				)																					AS coordinates,
				
				JSON_OBJECT(
					"openingHour", 		r.opening_hour,
					"closingHour", 		r.closing_hour
				)																					AS workingHours,

				(SELECT DISTINCT
					JSON_ARRAYAGG(
						JSON_OBJECT(
							"menuId", 				m.id,
							"name", 					m.name,
							"description", 		m.description,
							"price", 					m.price
						))   					
					FROM menues m
					INNER JOIN restaurants r 							ON m.restaurant_id = r.id
					WHERE r.id = ${restaurantId}
					GROUP BY r.id) 												AS menues,

				(SELECT DISTINCT
					JSON_ARRAYAGG(
						JSON_OBJECT(
							"tableId", 			t.id,
							"capacities", 	t.capacities
						)) 
					FROM tables t
					INNER JOIN restaurants r ON t.restaurant_id = r.id
					WHERE r.id = ${restaurantId}
					GROUP BY r.id)     										AS tables,

				(SELECT DISTINCT
					JSON_ARRAYAGG(
						JSON_OBJECT(
							"facilityId", 	f.id,
							"facility", 		f.facility
						))   						
					FROM facilities f
					INNER JOIN restaurant_facilities rf ON f.id = rf.facility_id
					INNER JOIN restaurants r ON rf.restaurant_id = r.id
					WHERE r.id = ${restaurantId}
					GROUP BY r.id)												AS facilities

			FROM restaurants r
			WHERE r.id = ${restaurantId}
			GROUP BY r.id, r.name;
		`);
        });
    }
    getMenues(restaurantId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.appDataSource.query(`
			SELECT * 
			FROM menues m
			WHERE m.restaurant_id = ${restaurantId};
		`);
        });
    }
}
exports.RestaurantModel = RestaurantModel;
