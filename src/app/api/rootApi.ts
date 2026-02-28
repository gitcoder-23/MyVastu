// api/rootApi.ts
import axios from 'axios';
import { baseUrl } from './config';
import store from '../redux/store'; // Make sure to export store from your store configuration
import { RefreshTokenAction } from '../redux/actions/authAction';
import { setLogout, setTokens } from '../redux/slices/authAppSlice';

const rootApi = axios.create({
    baseURL: baseUrl,
    timeout: 30000, // 30 seconds timeout for mobile
});

// Track if token refresh is in progress
let isRefreshing = false;
// Store pending requests
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// Request interceptor
rootApi.interceptors.request.use(
    (config) => {
        const token = store.getState().authApp.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
rootApi.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // If error is not 401 or request already retried, reject
        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        // Don't attempt refresh for refresh token endpoint itself
        if (originalRequest.url?.includes('refresh-token')) {
            store.dispatch(setLogout());
            return Promise.reject(error);
        }

        // If token refresh is in progress, queue the request
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return rootApi(originalRequest);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = store.getState().authApp.refreshToken;

        if (!refreshToken) {
            // No refresh token available, logout user
            store.dispatch(setLogout());
            isRefreshing = false;
            return Promise.reject(error);
        }

        try {
            // Call refresh token API
            const response = await store.dispatch(
                RefreshTokenAction({ refreshToken })
            ).unwrap();

            const newAccessToken = response.data?.accessToken || '';
            const newRefreshToken = response.data?.refreshToken || '';

            if (newAccessToken && newRefreshToken) {
                // Update tokens in store
                store.dispatch(setTokens({
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken
                }));

                // Update authorization header
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // Process queued requests
                processQueue(null, newAccessToken);

                return rootApi(originalRequest);
            } else {
                throw new Error('Invalid token response');
            }
        } catch (refreshError) {
            // Refresh failed - logout user
            processQueue(refreshError, null);
            store.dispatch(setLogout());
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);

let interceptor: number | null = null;

export const resetInterceptor = (token: string) => {
    // Remove existing interceptor if it exists
    if (interceptor !== null) {
        rootApi.interceptors.request.eject(interceptor);
        interceptor = null;
    }

    // Add new request interceptor
    interceptor = rootApi.interceptors.request.use(
        (config: any) => {
            console.log('@@@[API CALLING WITH AUTH TOKEN: ', token);

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                delete config.headers.Authorization;
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};

export default rootApi;










// import axios from 'axios';
// import { baseUrl } from './config';
// const rootApi = axios.create({
//     baseURL: baseUrl,
// });


// let interceptor: any;

// const resetInterceptor = (token: string) => {
//     console.log('@@@[API CALLING WITH AUTH TOKEN: ', token);
//     if (!interceptor) {
//         axios.interceptors.request.eject(interceptor);
//     }

//     // Add reaquest interceptor
//     interceptor = rootApi.interceptors.request.use((config: any) => {
//         console.log('@@@[API CALLING WITH AUTH CONFIG: ', token);

//         config.headers.Authorization = token ? `Bearer ${token}` : '';

//         return config;
//     });
// };

// export default rootApi;

// export { resetInterceptor };






// rootApi.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             console.log('401 Unauthorized error');
//         }
//         return Promise.reject(error);
//     }
// );
