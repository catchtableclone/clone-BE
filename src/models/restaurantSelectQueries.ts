import { RestaurantQueryParams } from "../controllers/restaurantQueryParams";


interface StringNumberMapper {
	[key: string]: number
}

interface WhereMapper {
	[key: string]: Function;
};

interface OrderByMapper {
	[key: string]: string;
}

const OrderByMapper: OrderByMapper = {
	PRICE_HIGH: "avg_price DESC",
	PRICE_LOW: "avg_price ASC",
	NEW: "created_at DESC",
	OLD: "created_at ASC",
}

const CUISINE_MAPPER: StringNumberMapper = {
	KOREAN: 1,
	CHINESE: 2,
	JAPANESE: 3,
	WESTERN: 4,
	WINE: 5,
	DESERT: 6
}

export class RestaurantsSelectQueries {

	private limit: number;
	private offset: number;
	private whereMapper: WhereMapper = {
		cuisineType: this.constructCuisineWhereClause,
		town: this.constructTownWhereClause,
		lowPrice: this.constructLowPriceWhereClause,
		highPrice: this.constructHighPriceWhereClause,
	}


	constructor(private queryParams: RestaurantQueryParams) {
		this.queryParams = queryParams;
		this.limit = queryParams.limit || 10;
		this.offset = queryParams.offset || 0;
	}

	createWhereClause(this: RestaurantsSelectQueries) {
		const clause: string[] = Object
		.entries(this.queryParams)
		.filter(([ key ]) => key in this.whereMapper)
		.map(([ key, value ]) => this.whereMapper[key](value));

		return clause.length ? `WHERE ${clause.join(" AND ")}` : ""; 
	}

	createOrderByClause(this: RestaurantsSelectQueries): string {
		if (this.queryParams.orderBy && Array.isArray(this.queryParams.orderBy)) {
			let clause = this.queryParams.orderBy.map((el) => OrderByMapper[el]);
			
			return clause.length ? `ORDER BY ${clause.join(", ")}` : "";
		}

		return this.queryParams.orderBy ? `ORDER BY ${OrderByMapper[this.queryParams.orderBy!]}` : "";
	}

	createLimitClause(this: RestaurantsSelectQueries): string {
		return `LIMIT ${Number(this.limit)} OFFSET ${Number(this.offset)}`
	}

	constructCuisineWhereClause(cuisineType: string): string {
		return `cuisine_id in (${CUISINE_MAPPER[cuisineType]})`;
	}

	constructTownWhereClause(town: string): string {
		return `town = "${town}"`;
	} 

	constructLowPriceWhereClause(lowPrice: number): string {
		return `avg_price BETWEEN ${lowPrice}`;
	}

	constructHighPriceWhereClause(highPrice: number): string {
		return `${highPrice}`;
	}

	constructQueries() {
		const whereClause = this.createWhereClause();
		const orderByClause = this.createOrderByClause();
		const limitClause = this.createLimitClause();

		return { whereClause, orderByClause, limitClause };
	}
}