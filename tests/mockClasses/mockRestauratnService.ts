import { RestaurantServices } from "../../src/services/restaurantServices";
import { RestaurantModel } from "../../src/models/restaurantModel";
import { RestaurantQueryParams } from "../../src/controllers/restaurantQueryParams";


export class mockRestaurantService extends RestaurantServices {
	constructor() { super(new RestaurantModel()); }

	async getRestaurants(_: RestaurantQueryParams): Promise<any> {
		return [ { id: "TEST", name: "TEST" } ];
	}

	async getRestaurantDetail(restaurantId: number): Promise<any> {
		return { id: restaurantId, name: "TEST" };
	}

	async getMenues(restaurantId: number): Promise<any> {
		return { id: restaurantId, name: "TEST" };
	}
}