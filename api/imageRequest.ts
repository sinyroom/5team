import axiosInstance from './settings/axiosInstance';
import axios from 'axios';

export async function getPresignedUrl(name: string): Promise<string> {
	try {
		const res = await axiosInstance.post(
			'/images',
			{
				name: name,
			},

			{ headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
		);

		if (res.status !== 200) {
			throw new Error(`presignedUrl 요청 실패: ${res.status}`);
		}

		if (!res.data.item?.url) {
			throw new Error('presignedUrl이 응답에 포함되지 않았습니다.');
		}

		return res.data.item.url;
	} catch (error) {
		console.error('presignedUrl 가져오기 중 오류:', error);
		throw error;
	}
}

export async function uploadToS3(presignedUrl: string, file: File) {
	try {
		const res = await axios.put(presignedUrl, file);

		if (res.status !== 200) {
			throw new Error(`업로드 실패: ${res.status}`);
		}

		return true;
	} catch (error) {
		console.error('S3 업로드 중 오류:', error);
		throw error;
	}
}
