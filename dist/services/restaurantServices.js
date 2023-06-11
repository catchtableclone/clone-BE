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
exports.RestaurantServices = void 0;
class RestaurantServices {
    constructor(model) {
        this.model = model;
        this.model = model;
    }
    getRestaurants(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.getRestaurants(queryParams);
        });
    }
    getRestaurantDetail(restaurantId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.getRestaurantDetail(restaurantId);
        });
    }
    getMenues(restaurantId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.getMenues(restaurantId);
        });
    }
}
exports.RestaurantServices = RestaurantServices;
