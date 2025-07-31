import axiosInstance from './settings/axiosInstance';
import type { AxiosError } from 'axios';
import type { Shop } from '@/types/shop';
import type { Link } from '@/types/link';

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
	links: Link[];
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
			// const errorMessage = (error.response?.data as { message: string }).message;
			const errorMessage =
				(error.response?.data as { message: string }).message ??
				error.message ??
				'알 수 없는 오류가 발생했습니다.';

			throw { status: error.response.status, message: errorMessage };
		} else {
			throw { status: error.response?.status || 500, message: '알 수 없는 오류가 발생했습니다.' };
		}
	}
};

export const editShop = async (shopData: ReqShop): Promise<ResShop | string> => {
	try {
		const res = await axiosInstance.put('/shops', shopData, {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
		});

		return res.data;
	} catch (err: unknown) {
		const error = err as AxiosError;
		console.log(error);
		if (error.status === 401 || error.status === 403 || error.status === 404) {
			const errorMessage = error.message;
			throw {
				status: error.status,
				message: errorMessage || `${error.status} 오류가 발생했습니다.`,
			};
		} else {
			throw { status: error.response?.status || 500, message: '알 수 없는 오류가 발생했습니다.' };
		}
	}
};
