import { Router } from "express";

import { RestaurantsController } from "../controllers/restaurantController";
import { RestaurantServices } from "../services/restaurantServices";
import { RestaurantModel } from "../models/restaurantModel";

export const restaurantRoutes: Router = Router();

const restaurants = new RestaurantsController(new RestaurantServices(new RestaurantModel()));

restaurantRoutes.get("", restaurants.getRestaurants);
restaurantRoutes.get("/:restaurantId", restaurants.getRestaurantsDetail);
restaurantRoutes.post("/menues", restaurants.getMenues);