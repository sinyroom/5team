import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://bootcamp-api.codeit.kr/api/16-05/the-julge',
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
	config => {
		const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	error => Promise.reject(error)
);

export default axiosInstance;
