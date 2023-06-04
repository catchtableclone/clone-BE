import { RestaurantModel } from "../models/restaurantModel";
import { RestaurantQueryParams } from "../controllers/restaurantQueryParams";


export class RestaurantServices {
	constructor(private model: RestaurantModel) {
		this.model = model;
	}
	
	async getRestaurants (queryParams: RestaurantQueryParams): Promise<any> {
		return await this.model.getRestaurants(queryParams);
	}

	async getRestaurantDetail (restaurantId: number): Promise<any> {
		return await this.model.getRestaurantDetail(restaurantId);
	}

	async getMenues (restaurantId: number) {
		return await this.model.getMenues(restaurantId);
	}
}