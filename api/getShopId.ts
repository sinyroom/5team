import { Shop } from '@/types';
import axiosInstance from './settings/axiosInstance';

export const getShopId = async (userId: string): Promise<{ item: Shop }> => {
	const res = await axiosInstance.get(`/users/${userId}`);
	const shop = res.data.item.shop?.item ?? null;
	return { item: shop };
};
