import { Shop } from './shop';

export type UserType = 'employer' | 'employee';

export type User = {
	id: string;
	email: string;
	type: UserType;
	name?: string;
	phone?: string;
	address?: string;
	bio?: string;
	shop: { item: Shop } | null;
};

export type GetUserResponse = {
	item: User;
	links: any[];
};
