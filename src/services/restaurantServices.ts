import { RestaurantModel } from "../models/restaurantModel";
import { RestaurantQueryParams } from "../controllers/interfaces/restaurantQueryParams";
import { Menu, RestaurantDetail, Restaurants } from "../models/interfaces/restaurantModel";


export class RestaurantServices {
	constructor(private model: RestaurantModel) {
		this.model = model;
	}
	
	async getRestaurants (queryParams: RestaurantQueryParams): Promise<Restaurants | never> {
		return await this.model.getRestaurants(queryParams);
	}

	async getRestaurantDetail (restaurantId: string): Promise<RestaurantDetail | never> {
		return await this.model.getRestaurantDetail(restaurantId);
	}

	async getMenues (restaurantId: string): Promise<Menu[] | never> {
		return await this.model.getMenues(restaurantId);
	}
}