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
		href: string;
	};
};

export type NoticeItem = {
	item: Notice;
	links: {
		rel: string;
		description: string;
		method: string;
		href: string;
	}[];
};

export type GetNoticeResponse = {
	offset: number;
	limit: number;
	address: string[];
	count: number;
	hasNext: boolean;
	items: NoticeItem[];
	links: {
		rel: string;
		description: string;
		method: string;
		href: string;
	}[];
};
