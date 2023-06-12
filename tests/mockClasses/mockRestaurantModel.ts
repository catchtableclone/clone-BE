import { RestaurantQueryParams } from "../../src/controllers/interfaces/restaurantQueryParams";
import { RestaurantModel } from "../../src/models/restaurantModel";

export class mockRestaurantModel extends RestaurantModel {
	constructor() { super(); }

	async getRestaurants(_: RestaurantQueryParams): Promise<any> {}

	async getRestaurantDetail(_: string): Promise<any> {}

	async getMenues(_: string): Promise<any> {}
}