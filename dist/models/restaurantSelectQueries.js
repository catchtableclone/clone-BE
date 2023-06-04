"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantsSelectQueries = void 0;
;
const OrderByMapper = {
    PRICE_HIGH: "avg_price DESC",
    PRICE_LOW: "avg_price ASC",
    NEW: "created_at DESC",
    OLD: "created_at ASC",
};
const CUISINE_MAPPER = {
    KOREAN: 1,
    CHINESE: 2,
    JAPANESE: 3,
    WESTERN: 4,
    WINE: 5,
    DESERT: 6
};
class RestaurantsSelectQueries {
    constructor(queryParams) {
        this.queryParams = queryParams;
        this.whereMapper = {
            cuisineType: this.constructCuisineWhereClause,
            town: this.constructTownWhereClause,
            lowPrice: this.constructLowPriceWhereClause,
            highPrice: this.constructHighPriceWhereClause,
        };
        this.queryParams = queryParams;
        this.limit = queryParams.limit || 10;
        this.offset = queryParams.offset || 0;
    }
    createWhereClause() {
        const clause = Object
            .entries(this.queryParams)
            .filter(([key]) => key in this.whereMapper)
            .map(([key, value]) => this.whereMapper[key](value));
        return clause.length ? `WHERE ${clause.join(" AND ")}` : "";
    }
    createOrderByClause() {
        if (this.queryParams.orderBy && Array.isArray(this.queryParams.orderBy)) {
            let clause = this.queryParams.orderBy.map((el) => OrderByMapper[el]);
            return clause.length ? `ORDER BY ${clause.join(", ")}` : "";
        }
        return this.queryParams.orderBy ? `ORDER BY ${OrderByMapper[this.queryParams.orderBy]}` : "";
    }
    createLimitClause() {
        return `LIMIT ${Number(this.limit)} OFFSET ${Number(this.offset)}`;
    }
    constructCuisineWhereClause(cuisineType) {
        return `cuisine_id in (${CUISINE_MAPPER[cuisineType]})`;
    }
    constructTownWhereClause(town) {
        return `town = "${town}"`;
    }
    constructLowPriceWhereClause(lowPrice) {
        return `avg_price BETWEEN ${lowPrice}`;
    }
    constructHighPriceWhereClause(highPrice) {
        return `${highPrice}`;
    }
    constructQueries() {
        const whereClause = this.createWhereClause();
        const orderByClause = this.createOrderByClause();
        const limitClause = this.createLimitClause();
        return { whereClause, orderByClause, limitClause };
    }
}
exports.RestaurantsSelectQueries = RestaurantsSelectQueries;
