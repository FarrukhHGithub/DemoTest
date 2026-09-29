import axios from "axios";
import { getFromLocalStorage } from "../../utils/local-storage";

export const instance = axios.create();

instance.defaults.headers.post['Accept'] = 'application/json';
instance.defaults.timeout = 60000;

instance.interceptors.request.use(function (config) {
    const accessToken = getFromLocalStorage('accessToken');
    if (accessToken) {
        config.headers.Authorization = accessToken;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    const responseObj = {
        data: response?.data?.data,
        meta: response?.data?.meta
    }
    return responseObj;
}, function (error) {
    if (error.response) {
        const { status, config } = error.response;
        const isUserauthUrl = config.url && config.url.includes('/api/userauth/');
        const isLoginUrl = config.url && config.url.includes('/api/userauth/login');
        
        if ((status === 401 && !isLoginUrl) || (status === 404 && isUserauthUrl)) {
            localStorage.removeItem('token');
            localStorage.removeItem('clientId');
            localStorage.removeItem('loginTime');
            window.location.href = '/login';
        }
    }
    return Promise.reject(error);
});