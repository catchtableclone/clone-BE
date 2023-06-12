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
exports.RestaurantsController = void 0;
const customError_1 = require("../utils/customError");
class RestaurantsController {
    constructor(service) {
        this.service = service;
        this.getRestaurants = this.getRestaurants.bind(this);
        this.getRestaurantsDetail = this.getRestaurantsDetail.bind(this);
        this.getMenues = this.getMenues.bind(this);
    }
    getRestaurants(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = req.query;
            const data = yield this.service.getRestaurants(queryParams);
            return res.status(201).json(data);
        });
    }
    getRestaurantsDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurantId = req.params.restaurantId;
            if (!restaurantId)
                throw new customError_1.CustomError("NOT VALID ID", 401);
            const data = yield this.service.getRestaurantDetail(restaurantId);
            return res.status(201).json(data);
        });
    }
    getMenues(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurantId = req.body.restaurantId;
            if (!restaurantId)
                throw new customError_1.CustomError("NOT VALID ID", 401);
            const data = yield this.service.getMenues(restaurantId);
            return res.status(201).json(data);
        });
    }
}
exports.RestaurantsController = RestaurantsController;
