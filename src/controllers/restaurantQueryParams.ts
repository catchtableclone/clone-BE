export interface RestaurantQueryParams {
	cousineType?: string;
	town?: string;
	lowPrice?: number;
	highPrice?: number;
	orderBy?: string | string[];
	limit?: number;
	offset?: number;
}