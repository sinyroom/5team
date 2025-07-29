import axiosInstance from '../settings/axiosInstance';
import { GetNoticeResponse } from '@/types/userNotice';

export type NoticeQueryParams = {
	offset: number;
	limit: number;
	address?: string;
	keyword?: string;
	startsAtGte?: string;
	hourlyPayGte?: number;
	sort?: 'time' | 'pay' | 'hour' | 'shop';
};

/**
 * 공고 목록을 조회하는 API
 * @param params 공고 필터 및 정렬 조건
 * @returns 공고 리스트 응답
 */
export const fetchNoticeList = async (params: NoticeQueryParams): Promise<GetNoticeResponse> => {
	const res = await axiosInstance.get('/notices', { params });
	return res.data;
};
