import axios from 'axios';
import { baseUrl, baseUrlNew } from './config';
import store from '../redux/store';

const rootApi = axios.create({
    baseURL: baseUrl,
});


export const rootApiNew = axios.create({
    baseURL: baseUrlNew,
});

let requestInterceptor: any;
// This callback will be filled by SessionHandler
let onSessionExpired: (() => void) | null = null;

export const setSessionExpiredCallback = (callback: () => void) => {
    onSessionExpired = callback;
};

const resetInterceptor = (token: string) => {
    console.log('@@@[API CALLING WITH AUTH TOKEN: ', token);
    if (requestInterceptor !== undefined) {
        rootApi.interceptors.request.eject(requestInterceptor);
    }

    requestInterceptor = rootApi.interceptors.request.use((config: any) => {
        console.log('@@@[API CALLING WITH AUTH CONFIG: ', token);
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    });
};

rootApi.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.authApp.accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

// GLOBAL RESPONSE INTERCEPTOR
rootApi.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log('API Error Status:', error.response?.status);
        if (error.response && error.response.status === 401) {
            console.log('Unauthorized detected, triggering popup...');
            if (onSessionExpired) {
                onSessionExpired(); // Trigger the modal in the UI
            }
        }
        return Promise.reject(error);
    }
);

export default rootApi;
export { resetInterceptor };

