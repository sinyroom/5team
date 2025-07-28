import { ShopNoticeResponse } from '@/types';
import axiosInstance from './settings/axiosInstance';

export const getNoticeList = async (shopId: string): Promise<ShopNoticeResponse> => {
	const res = await axiosInstance.get(`/shops/${shopId}/notices`);
	return res.data;
};
