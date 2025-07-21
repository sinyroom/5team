import { Notice } from '@/types/notice';
import axiosInstance from './settings/axiosInstance';

export const getNoticeId = async (shopId: string, noticeId: string): Promise<{ item: Notice }> => {
	const response = await axiosInstance.get(`/shops/${shopId}/notices/${noticeId}`);
	return response.data;
};
