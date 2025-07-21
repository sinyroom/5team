import { Shop } from '@/types/shop';
import axiosInstance from './settings/axiosInstance';

export const getShopId = async (shopId: string): Promise<{ item: Shop }> => {
	const response = await axiosInstance.get(`/shops/${shopId}`);
	return response.data;
};
