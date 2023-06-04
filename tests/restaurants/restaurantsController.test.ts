import { RestaurantsController } from "../../src/controllers/restaurantController";
import { mockRestaurantService } from "../mockClasses/mockRestauratnService";


describe("restaurantsController", () => {

	describe("getRestaurants", () => {
		test.each([
			{ inputs: { query: {} }, outputs: [ { id: "TEST", name: "TEST" } ] },
			{ inputs: { query: { cuisine: "CHINESE" } }, outputs: [ { id: "TEST", name: "TEST" } ] },
		])("given $inputs should return $outputs", async ({ inputs, outputs }) => {
			// Arrange		
			const mockRequest = createMockRequest(inputs);
			const mockResponse = createMockResponse();
			const mockServices = new mockRestaurantService();
			const spyRestaurant = jest.spyOn(mockServices, "getRestaurants");
			const restaurants = new RestaurantsController(mockServices);

			// Act
			const sut = await restaurants.getRestaurants(mockRequest, mockResponse);

			// Assert
			expect(sut).toEqual(outputs);
			expect(spyRestaurant).toHaveBeenCalledWith(inputs.query);
		})
	})
	
	describe("getRestaurantsDetail", () => {
		test.each([
			{ inputs: { params: { id: 1 }, body: {} }, outputs: { id: 1, name: "TEST" } },
			{ inputs: { params: { id: 2 }, body: {} }, outputs: { id: 2, name: "TEST" } }
		])("given $inputs should return $outputs", async ({ inputs, outputs }) => {
			// Arrange		
			const mockRequest = createMockRequest(inputs);
			const mockResponse = createMockResponse();
			const mockServices = new mockRestaurantService();
			const spyRestaurantDetail = jest.spyOn(mockServices, "getRestaurantDetail");
			const restaurants = new RestaurantsController(mockServices);

			// Act
			const sut = await restaurants.getRestaurantsDetail(mockRequest, mockResponse);

			// Assert
			expect(sut).toEqual(outputs);
			expect(spyRestaurantDetail).toHaveBeenCalledWith(inputs.params.id);
		})

		test.each([
			{ inputs: { params: { id: null }, body: {} } },
			{ inputs: { params: { id: undefined }, body: {} } },
			{ inputs: { params: { id: "ID" }, body: {} } },
		])("should throw an error", ({ inputs }) => {
			// Arrange		
			const mockRequest = createMockRequest(inputs);
			const mockResponse = createMockResponse();
			const mockServices = new mockRestaurantService();
			const restaurants = new RestaurantsController(mockServices);

			// Act
			const sut = async () => {
				return await restaurants.getRestaurantsDetail(mockRequest, mockResponse);
			}

			// Assert
			expect(sut).rejects.toThrowError("NOT VALID ID");
		})
	})

	describe("getMenues", () => {
		test.each([
			{ inputs: { params: { id: 1 }, body: {} }, outputs: { id: 1, name: "TEST" } },
			{ inputs: { params: { id: 2 }, body: {} }, outputs: { id: 2, name: "TEST" } }
		])("given $inputs should return $outputs", async ({ inputs, outputs }) => {
			// Arrange		
			const mockRequest = createMockRequest(inputs);
			const mockResponse = createMockResponse();
			const mockServices = new mockRestaurantService();
			const spyRestaurantDetail = jest.spyOn(mockServices, "getMenues");
			const restaurants = new RestaurantsController(mockServices);

			// Act
			const sut = await restaurants.getMenues(mockRequest, mockResponse);

			// Assert
			expect(sut).toEqual(outputs);
			expect(spyRestaurantDetail).toHaveBeenCalledWith(inputs.params.id);
		})

		test.each([
			{ inputs: { params: { id: null }, body: {} } },
			{ inputs: { params: { id: undefined }, body: {} } },
			{ inputs: { params: { id: "ID" }, body: {} } },
		])("should throw an error", ({ inputs }) => {
			// Arrange		
			const mockRequest = createMockRequest(inputs);
			const mockResponse = createMockResponse();
			const mockServices = new mockRestaurantService();
			const restaurants = new RestaurantsController(mockServices);

			// Act
			const sut = async () => {
				return await restaurants.getRestaurantsDetail(mockRequest, mockResponse);
			}

			// Assert
			expect(sut).rejects.toThrowError("NOT VALID ID");
		})
	})
})


const createMockRequest: any = (inputs: Object) => {
	return { ...inputs };
}

const createMockResponse: any = () => {
  return {
		status: jest.fn().mockReturnThis(),
    json: jest.fn((data: any) => data)
  };
};
