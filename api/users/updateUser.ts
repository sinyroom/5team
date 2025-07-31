import axiosInstance from '@/api/settings/axiosInstance';
import { NextApiRequest, NextApiResponse } from 'next';

export interface UpdateUserRequest {
	name: string;
	phone: string;
	address: string;
	bio: string;
}

export interface UpdateUserResponse {
	item: {
		id: string;
		email: string;
		type: string;
		name: string;
		phone: string;
		address: string;
		bio: string;
		shop: null;
	};
	links: {
		rel: string;
		description: string;
		method: string;
		href: string;
		body?: Record<string, any>;
		query?: Record<string, any>;
	}[];
}

/**
 * 사용자 정보 수정
 * @param userId 사용자 ID
 * @param token 조회할 사용자 토큰
 * @param data 수정할 데이터
 */
export const updateUser = async (userId: string, token: string, formData: UpdateUserRequest) => {
	const res = await axiosInstance.put(`/users/${userId}`, formData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return res.data;
};
