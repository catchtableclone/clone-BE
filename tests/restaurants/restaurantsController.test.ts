import { RestaurantsController } from "../../src/controllers/restaurantController";
import { mockRestaurantService } from "../mockClasses/mockRestauratnService";


describe("restaurantsController", () => {

	describe("getRestaurants", () => {
		test.each([
			{ inputs: { query: {} } },
			{ inputs: { query: { cuisine: "CHINESE" } } },
		])("given $inputs should be called with $inputs", async ({ inputs }) => {
			// Arrange		
			const mockRequest = createMockRequest(inputs);
			const mockResponse = createMockResponse();
			const mockServices = new mockRestaurantService();
			const spyRestaurant = jest.spyOn(mockServices, "getRestaurants");
			const restaurants = new RestaurantsController(mockServices);

			// Act
			await restaurants.getRestaurants(mockRequest, mockResponse);

			// Assert
			expect(spyRestaurant).toHaveBeenCalledWith(inputs.query);
		})
	})
	
	describe("getRestaurantsDetail", () => {
		test.each([
			{ inputs: { params: { restaurantId: "1" }, body: {} } },
			{ inputs: { params: { restaurantId: "2" }, body: {} } }
		])("given $inputs should be called with $inputs", async ({ inputs }) => {
			// Arrange		
			const mockRequest = createMockRequest(inputs);
			const mockResponse = createMockResponse();
			const mockServices = new mockRestaurantService();
			const spyRestaurantDetail = jest.spyOn(mockServices, "getRestaurantDetail");
			const restaurants = new RestaurantsController(mockServices);

			// Act
			await restaurants.getRestaurantsDetail(mockRequest, mockResponse);

			// Assert
			expect(spyRestaurantDetail).toHaveBeenCalledWith(inputs.params.restaurantId);
		})

		test.each([
			{ inputs: { params: { restaurantId: null }, body: {} } },
			{ inputs: { params: { restaurantId: undefined }, body: {} } },
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
			{ inputs: { body: { restaurantId: "1" } } },
			{ inputs: { body: { restaurantId: "2" } } }
		])("given $inputs should be called with $inputs", async ({ inputs }) => {
			// Arrange		
			const mockRequest = createMockRequest(inputs);
			const mockResponse = createMockResponse();
			const mockServices = new mockRestaurantService();
			const spyRestaurantDetail = jest.spyOn(mockServices, "getMenues");
			const restaurants = new RestaurantsController(mockServices);

			// Act
			await restaurants.getMenues(mockRequest, mockResponse);

			// Assert
			expect(spyRestaurantDetail).toHaveBeenCalledWith(inputs.body.restaurantId);
		})

		test.each([
			{ inputs: { body: { restaurantId: null } } },
			{ inputs: { body: { restaurantId: undefined } } },
		])("should throw an error", ({ inputs }) => {
			// Arrange		
			const mockRequest = createMockRequest(inputs);
			const mockResponse = createMockResponse();
			const mockServices = new mockRestaurantService();
			const restaurants = new RestaurantsController(mockServices);

			// Act
			const sut = async () => {
				return await restaurants.getMenues(mockRequest, mockResponse);
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
