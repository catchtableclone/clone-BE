import { RestaurantsSelectQueries } from "../../src/models/restaurantSelectQueries";

describe("restaurantSelectQueries", () => {
	describe("All queries are provided", () => {
		test.each([
			{ 
				inputs: 
					{ cuisineType: "KOREAN", town: "성수동", lowPrice: 10000, highPrice: 20000, orderBy: "PRICE_HIGH", limit: 10, offset: 0 }, 
				outputs: 
					{ limitClause: "LIMIT 10 OFFSET 0", orderByClause: "ORDER BY avg_price DESC", whereClause: "WHERE cuisine_id in (1) AND town = \"성수동\" AND avg_price BETWEEN 10000 AND 20000",} 
			},
			{ 
				inputs: 
					{ cuisineType: "CHINESE", town: "성수동", lowPrice: 10000, highPrice: 20000, orderBy: [ "PRICE_HIGH", "NEW" ], limit: 10, offset: 0 }, 
				outputs: 
					{ limitClause: "LIMIT 10 OFFSET 0", orderByClause: "ORDER BY avg_price DESC, created_at DESC", whereClause: "WHERE cuisine_id in (2) AND town = \"성수동\" AND avg_price BETWEEN 10000 AND 20000",} 
			},
		])("given $inputs should return $outputs", ({ inputs, outputs }) => {
			// Arrange
			const queryBuilder = new RestaurantsSelectQueries(inputs);

			// Act
			const sut = queryBuilder.constructQueries();

			// Assert
			expect(sut).toEqual(outputs);
		})
	})


	describe("only a few queries are provided", () => {
		test.each([
			{ 
				inputs: 
					{ cuisineType: "KOREAN", lowPrice: 10000, highPrice: 20000, orderBy: "PRICE_HIGH", limit: 10, offset: 0 }, 
				outputs: 
					{ limitClause: "LIMIT 10 OFFSET 0", orderByClause: "ORDER BY avg_price DESC", whereClause: "WHERE cuisine_id in (1) AND avg_price BETWEEN 10000 AND 20000",} 
			},
			{ 
				inputs: 
					{ cuisineType: "KOREAN", orderBy: "PRICE_HIGH", limit: 10, offset: 0 }, 
				outputs: 
					{ limitClause: "LIMIT 10 OFFSET 0", orderByClause: "ORDER BY avg_price DESC", whereClause: "WHERE cuisine_id in (1)" } 
			},
			{ 
				inputs: 
					{ lowPrice: 10000, highPrice: 20000, orderBy: "PRICE_HIGH", limit: 10, offset: 0 }, 
				outputs: 
					{ limitClause: "LIMIT 10 OFFSET 0", orderByClause: "ORDER BY avg_price DESC", whereClause: "WHERE avg_price BETWEEN 10000 AND 20000",} 
			},
		])("given $inputs should return $outputs", ({ inputs, outputs }) => {
			// Arrange
			const queryBuilder = new RestaurantsSelectQueries(inputs);

			// Act
			const sut = queryBuilder.constructQueries();

			// Assert
			expect(sut).toEqual(outputs);
		})
	})

	describe("No queries are provided", () => {
		test.each([
			{ inputs: {}, outputs: { limitClause: "LIMIT 10 OFFSET 0", orderByClause: "", whereClause: "",} }
		])("given $inputs should return $outputs", ({ inputs, outputs }) => {
			// Arrange
			const queryBuilder = new RestaurantsSelectQueries(inputs);

			// Act
			const sut = queryBuilder.constructQueries();

			// Assert
			expect(sut).toEqual(outputs);
		})
	})
}) 
