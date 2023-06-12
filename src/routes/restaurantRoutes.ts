import { Router } from "express";

import { catchAsync } from "../middlewares/errorHandlingMiddleware";
import { RestaurantsController } from "../controllers/restaurantController";
import { RestaurantServices } from "../services/restaurantServices";
import { RestaurantModel } from "../models/restaurantModel";

export const restaurantRoutes: Router = Router();

const restaurants = new RestaurantsController(new RestaurantServices(new RestaurantModel()));

restaurantRoutes.get("", catchAsync(restaurants.getRestaurants));
restaurantRoutes.get("/:restaurantId", catchAsync(restaurants.getRestaurantsDetail));
restaurantRoutes.post("/menues", catchAsync(restaurants.getMenues));