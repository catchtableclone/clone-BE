import { RestaurantQueryParams } from "../../src/controllers/interfaces/restaurantQueryParams";
import { RestaurantModel } from "../../src/models/restaurantModel";

export class mockRestaurantModel extends RestaurantModel {
	constructor() { super(); }

	// async getRestaurants(_: RestaurantQueryParams) {
	// 	console.log("TEST");
	// }

	// async getRestaurantDetail(restaurantId: string) {
	// 	return { id: restaurantId, name: `restaurant${restaurantId}` };
	// }

	async getMenues(restaurantId: string) {
		return [
			{
					"id": 1,
					"restaurant_id": Number(restaurantId),
					"name": "한정식 코스",
					"description": "좋은 한정식 세트",
					"price": "80000.000"
			}
		]
	}
}