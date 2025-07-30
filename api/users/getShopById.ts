import axiosInstance from '../settings/axiosInstance';
import { Shop } from '../../types/shop';

export const getShopById = async (shopId: string): Promise<{ item: Shop }> => {
	const res = await axiosInstance.get(`/shops/${shopId}`);
	return { item: res.data.item };
};
