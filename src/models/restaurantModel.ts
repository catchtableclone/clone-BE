import { appDataSource } from "../database/database";
import { RestaurantQueryParams } from "../controllers/interfaces/restaurantQueryParams";
import { RestaurantsSelectQueries } from "./restaurantSelectQueries";
import { Menu, RestaurantDetail, Restaurants } from "./interfaces/restaurantModel";
import { CustomError } from "../utils/customError";

export class RestaurantModel {
	constructor(private queryBuilder?: RestaurantsSelectQueries) {}
	
	async getRestaurants(queryParams: RestaurantQueryParams): Promise<Restaurants | never> {
		try {
			this.queryBuilder = new RestaurantsSelectQueries(queryParams);
			const { whereClause, orderByClause, limitClause } = this.queryBuilder.constructQueries();
			
			return appDataSource.query(`
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
		} catch {
			throw new CustomError("데이터베이스 오류", 404);
		}
	}

	async getRestaurantDetail(restaurantId: string): Promise<RestaurantDetail | never> {
		try {
			return await appDataSource.query(`
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
		} catch {
			throw new CustomError("데이터베이스 오류", 404);
		}
	}

	async getMenues(restaurantId: string): Promise<Menu[] | never> {
		try {
			return await appDataSource.query(`
				SELECT * 
				FROM menues m
				WHERE m.restaurant_id = ${restaurantId};
			`);
		} catch {
			throw new CustomError("데이터베이스 오류", 404);
		}
	}
}