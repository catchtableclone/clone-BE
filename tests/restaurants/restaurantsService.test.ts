import { RestaurantServices } from "../../src/services/restaurantServices"
import { mockRestaurantModel } from "../mockClasses/mockRestaurantModel"

describe("RestaurantService", () => {

	describe("getRestaurants", () => {
		test.each([
			{ inputs: { limit: 10, orderBy: "price", cuisineType: "CHINESE" } },
			{ inputs: { cuisine: "CHINESE" } },
		])("given $inputs should be called with $inputs", async ({ inputs }) => {
			// Arrange
			const mockModel = new mockRestaurantModel();
			const service = new RestaurantServices(mockModel);
			const spyRestaurant = jest.spyOn(mockModel, "getRestaurants");

			// Act
			await service.getRestaurants(inputs);

			// Assert
			expect(spyRestaurant).toHaveBeenCalledWith(inputs);
		})
	})

	describe("getRestaurantDetail", () => {
		test.each([
			{ inputs: "1" },
			{ inputs: "2" }
		])("given $inputs should be called with $inputs", async ({ inputs }) => {
			// Arrange
			const mockModel = new mockRestaurantModel();
			const service = new RestaurantServices(mockModel);
			const spyRestaurant = jest.spyOn(mockModel, "getRestaurantDetail");

			// Act
			await service.getRestaurantDetail(inputs);

			// Assert
			expect(spyRestaurant).toHaveBeenCalledWith(inputs);
		})
	})

	describe("getMenues", () => {
		test.each([
			{ inputs: "1" },
			{ inputs: "2" }
		])("given $inputs should be called with $inputs ", async ({ inputs }) => {
			// Arrange
			const mockModel = new mockRestaurantModel();
			const service = new RestaurantServices(mockModel);
			const spyRestaurant = jest.spyOn(mockModel, "getMenues");

			// Act
			await service.getMenues(inputs);

			// Assert
			expect(spyRestaurant).toHaveBeenCalledWith(inputs);
		})
	})
})

