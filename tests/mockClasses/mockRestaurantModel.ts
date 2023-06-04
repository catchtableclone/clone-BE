import { RestaurantQueryParams } from "../../src/controllers/restaurantQueryParams";
import { RestaurantModel } from "../../src/models/restaurantModel";

export class mockRestaurantModel extends RestaurantModel {
	constructor() { super(); }

	async getRestaurants(_: RestaurantQueryParams) {
		return [ { id: "TEST", name: "TEST" } ];
	}

	async getRestaurantDetail(restaurantId: number) {
		return { id: restaurantId, name: `restaurant${restaurantId}` };
	}

	async getMenues(restaurantId: number) {
		return { id: restaurantId, name: `restaurant${restaurantId}` };
	}
}