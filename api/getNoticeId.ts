import { NoticeItem } from '@/types';
import axiosInstance from './settings/axiosInstance';

export const getNoticeId = async (
	shopId: string,
	noticeId: string
): Promise<{ item: NoticeItem }> => {
	const res = await axiosInstance.get(`/shops/${shopId}/notices/${noticeId}`);
	const notice = res.data.item ?? null;
	return { item: notice };
};
