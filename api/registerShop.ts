import axiosInstance from './settings/axiosInstance';
import type { AxiosError } from 'axios';
import type { Shop } from '@/types/shop';

type ReqShop = Omit<Shop, 'id'>;

type ResShop = {
	item: Shop & {
		user: {
			item: {
				id: string;
				email: string;
				type: string;
			};
			href: string;
		};
	};
	links: {
		rel: string;
		description: string;
		method: 'GET' | 'PUT' | 'POST' | 'DELETE';
		href: string;
		body?: Partial<Shop>;
		query?: {
			offset: number | 'undefined';
			limit: number | 'undefined';
		};
	}[];
};

export const registerShop = async (shopData: ReqShop): Promise<ResShop | string> => {
	try {
		const res = await axiosInstance.post('/shops', shopData, {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
		});

		return res.data;
	} catch (err: unknown) {
		const error = err as AxiosError;

		if (error.response?.status === 401 || error.response?.status === 409) {
			const errorMessage = (error.response?.data as { message: string }).message;
			throw { status: error.response.status, message: errorMessage };
		} else {
			throw { status: error.response?.status || 500, message: '알 수 없는 오류가 발생했습니다.' };
		}
	}
};
