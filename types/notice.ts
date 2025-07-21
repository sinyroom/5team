import { Shop } from './shop';

export type Notice = {
	id: string;
	hourlyPay: number;
	startsAt: string;
	workhour: number;
	description: string;
	closed: boolean;
	shop: {
		item: Shop;
	};
};
