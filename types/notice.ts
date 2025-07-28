import { ShopWrapper } from './shop';

export interface NoticeItem {
	id: string;
	hourlyPay: number;
	startsAt: string;
	workhour: number;
	description: string;
	closed: boolean;
	shop: ShopWrapper;
}

export interface NoticeList {
	id: string;
	hourlyPay: number;
	startsAt: string;
	workhour: number;
	description: string;
	closed: boolean;
}

export interface ShopNoticeResponse {
	offset: number;
	limit: number;
	count: number;
	hasNext: boolean;
	items: {
		item: NoticeList;
		links: any[]; // 필요 시 구체 타입 지정
	}[];
	links: any[];
}

export interface NoticeResponse {
	item: NoticeList;
	links: any[];
}
