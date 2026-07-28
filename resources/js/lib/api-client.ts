import axios from 'axios';

export const API_URL = '/api';

export const axiosInstance = axios.create({
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
});

export const ensureCsrfCookie = (): Promise<void> =>
    axiosInstance.get('/sanctum/csrf-cookie').then(() => undefined);
