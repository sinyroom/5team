export type Shop = {
	id: string;
	name: string;
	category: string;
	address1: string;
	address2: string;
	description: string;
	imageUrl: string;
	originalHourlyPay: number;
};

export interface ShopWrapper {
	item: Shop;
	href: string;
}
