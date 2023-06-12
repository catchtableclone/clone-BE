import { RestaurantServices } from "../../src/services/restaurantServices";
import { RestaurantModel } from "../../src/models/restaurantModel";
import { RestaurantQueryParams } from "../../src/controllers/interfaces/restaurantQueryParams";


export class mockRestaurantService extends RestaurantServices {
	constructor() { super(new RestaurantModel()); }

	async getRestaurants(_: RestaurantQueryParams): Promise<any> {}

	async getRestaurantDetail(_: string): Promise<any> {}

	async getMenues(_: string): Promise<any> {}
}