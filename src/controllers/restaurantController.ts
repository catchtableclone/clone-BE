import { Request, Response } from "express";

import { RestaurantServices } from "../services/restaurantServices";
import { RestaurantQueryParams } from "./interfaces/restaurantQueryParams";
import { CustomError } from "../utils/customError";

export class RestaurantsController {
	constructor(private service: RestaurantServices) {
		this.getRestaurants = this.getRestaurants.bind(this);
		this.getRestaurantsDetail = this.getRestaurantsDetail.bind(this);
		this.getMenues = this.getMenues.bind(this);
	}

	async getRestaurants(req: Request, res: Response): Promise<Response | never> {
		const queryParams: RestaurantQueryParams = req.query;

		const data = await this.service.getRestaurants(queryParams);

		return res.status(201).json(data);
	}
	
	async getRestaurantsDetail(req: Request, res: Response): Promise<Response | never> {
		const restaurantId = req.params.restaurantId;
		
		if (!restaurantId) throw new CustomError("NOT VALID ID" , 401);
		
		const data = await this.service.getRestaurantDetail(restaurantId);

		return res.status(201).json(data);
	}

	async getMenues(req: Request, res: Response): Promise<Response | never> {
		const restaurantId = req.body.restaurantId;
		
		if (!restaurantId) throw new CustomError("NOT VALID ID" , 401);

		const data = await this.service.getMenues(restaurantId);

		return res.status(201).json(data);
	}
}