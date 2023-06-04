import { RestaurantServices } from "../../src/services/restaurantServices"
import { mockRestaurantModel } from "../mockClasses/mockRestaurantModel"

describe("RestaurantService", () => {

	describe("getRestaurants", () => {
		test.each([
			{ inputs: { limit: 10, orderBy: "price", cuisineType: "CHINESE" }, outputs: [ { id: "TEST", name: "TEST" } ] },
			{ inputs: { cuisine: "CHINESE" }, outputs: [ { id: "TEST", name: "TEST" } ] },
		])("given $inputs should return $outputs", async ({ inputs, outputs }) => {
			// Arrange
			const mockModel = new mockRestaurantModel();
			const service = new RestaurantServices(mockModel);
			const spyRestaurant = jest.spyOn(mockModel, "getRestaurants");

			// Act
			const sut = await service.getRestaurants(inputs);

			// Assert
			expect(spyRestaurant).toHaveBeenCalledWith(inputs);
			expect(sut).toEqual(outputs);
		})
	})

	describe("getRestaurantDetail", () => {
		test.each([
			{ inputs: 1, outputs: { id: 1, name: "restaurant1" }},
			{ inputs: 2, outputs: { id: 2, name: "restaurant2" }}
		])("given $inputs should return $outputs", async ({ inputs, outputs }) => {
			// Arrange
			const mockModel = new mockRestaurantModel();
			const service = new RestaurantServices(mockModel);
			const spyRestaurant = jest.spyOn(mockModel, "getRestaurantDetail");

			// Act
			const sut = await service.getRestaurantDetail(inputs);

			// Assert
			expect(spyRestaurant).toHaveBeenCalledWith(inputs);
			expect(sut).toEqual(outputs);
		})
	})

	describe("getMenues", () => {
		test.each([
			{ inputs: 1, outputs: { id: 1, name: "restaurant1" }},
			{ inputs: 2, outputs: { id: 2, name: "restaurant2" }}
		])("given $inputs should return $outputs", async ({ inputs, outputs }) => {
			// Arrange
			const mockModel = new mockRestaurantModel();
			const service = new RestaurantServices(mockModel);
			const spyRestaurant = jest.spyOn(mockModel, "getMenues");

			// Act
			const sut = await service.getMenues(inputs);

			// Assert
			expect(spyRestaurant).toHaveBeenCalledWith(inputs);
			expect(sut).toEqual(outputs);
		})
	})
})

