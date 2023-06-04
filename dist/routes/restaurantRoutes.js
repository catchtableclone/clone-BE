"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantRoutes = void 0;
const express_1 = require("express");
const restaurantController_1 = require("../controllers/restaurantController");
const restaurantServices_1 = require("../services/restaurantServices");
const restaurantModel_1 = require("../models/restaurantModel");
exports.restaurantRoutes = (0, express_1.Router)();
const restaurants = new restaurantController_1.RestaurantsController(new restaurantServices_1.RestaurantServices(new restaurantModel_1.RestaurantModel()));
exports.restaurantRoutes.get("", restaurants.getRestaurants);
exports.restaurantRoutes.get("/:restaurantId", restaurants.getRestaurantsDetail);
exports.restaurantRoutes.post("/menues", restaurants.getMenues);
