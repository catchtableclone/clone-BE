interface Table {
	id: number;
	capacities: number;
}

interface Facility {
	facilityId: number;
	facility: string
}

export interface Menu {
	id: number;
	restaurant_id: number;
	name: string;
	description: string;
	price: string;
}

export interface Restaurants {
	restaurantId: number;
	restaurateurId: number;
	restaurantName: string;
	img: string;
	price: string;
	createdAt: string;
	cuisineName: string;
	coordinates: 
	{
		lat: string;
		lng: string;
	}
}

export interface RestaurantDetail {
	restaurantId: number;
	restaurateurId: number;
	restaurantName: string;
	img: string;

	contactInfo: 
	{
		email: string;
		address: string;
		telephone: string;
	};

	coordinates: 
	{
		lat: number;
		lng: number;
	};

	workingHours: 
	{
		openingHour: string;
		closingHour: string;

	};

	menues: Menu[];
	tables: Table[];
	facilities: Facility[];
}
