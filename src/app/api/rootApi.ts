import axios from 'axios';
import { baseUrl } from './config';
const rootApi = axios.create({
    baseURL: baseUrl,
});

rootApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.log('401 Unauthorized error');
        }
        return Promise.reject(error);
    }
);

export default rootApi;