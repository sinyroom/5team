import { Shop } from './shop';

export type Link = {
	rel: string;
	description: string;
	method: 'GET' | 'PUT' | 'POST' | 'DELETE';
	href: string;
	body?: Partial<Shop>;
	query?: {
		offset: number | 'undefined';
		limit: number | 'undefined';
	};
};
