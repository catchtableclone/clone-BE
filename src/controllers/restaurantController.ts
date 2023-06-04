import { Request, Response } from "express";

import { RestaurantServices } from "../services/restaurantServices";
import { RestaurantQueryParams } from "./restaurantQueryParams";
import { CustomError } from "../utils/customError";

export class RestaurantsController {
	constructor(private service: RestaurantServices) {
		this.service = service;
	}

	async getRestaurants(req: Request, res: Response) {
		const queryParams: RestaurantQueryParams = req.query;

		const data = await this.service.getRestaurants(queryParams);

		return res.status(201).json(data);
	}
	
	async getRestaurantsDetail(req: Request, res: Response) {
		const restaurantId = req.params.id;
		
		if (!restaurantId || typeof restaurantId !== "number") throw new CustomError("NOT VALID ID" , 401);
		
		const data = await this.service.getRestaurantDetail(restaurantId);

		return res.status(201).json(data);
	}

	async getMenues(req: Request, res: Response) {
		const restaurantId = req.params.id;
		
		if (!restaurantId || typeof restaurantId !== "number") throw new CustomError("NOT VALID ID" , 401);

		const data = await this.service.getMenues(restaurantId);

		return res.status(201).json(data);
	}
}