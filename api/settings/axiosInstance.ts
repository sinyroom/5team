import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://bootcamp-api.codeit.kr/api/16-05/the-julge',
});

export default axiosInstance;

