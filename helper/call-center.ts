import axios, {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';
import { CookieStoreControl } from '@/hooks/cookie-storage';
const LOGIN_URL = '/';

const axiosClient = axios.create({
    baseURL: '/service/',
    headers: {
        'Content-Type': 'application/json',
    },
});

const EXCEPTION_MESSAGE = {
    '401': {
        R_TOKEN_NOT_EXIST: 'R_TOKEN_NOT_EXIST',
        R_TOKEN_EXPIRED: 'R_TOKEN_EXPIRED',
        A_TOKEN_EXPIRED: 'A_TOKEN_EXPIRED',
        DATA_NOT_VALIDAT: 'DATA_NOT_VALIDATE',
        USER_NOT_EXIST: 'USER_NOT_EXIST',
    },
    '404': {
        COMPANY_NOT_fOUND: 'COMPANY_NOT_fOUND',
    },
};

const cookieInstance = CookieStoreControl.getInstance();
axiosClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const rf_token = cookieInstance.token.get_refresh_token();
        if (config.url === '/profile' && !rf_token) {
            return Promise.reject();
        }

        const accessToken = cookieInstance.token.get_access_token();
        if (accessToken) {
            config.headers.Authorization = 'Bearer ' + accessToken;
        }

        return config;
    },
    (err: AxiosError) => {
        return Promise.reject(err);
    }
);

const directToHome = () => {
    if (window && window.location.pathname !== LOGIN_URL) {
        window.location.replace(LOGIN_URL);
    }
};

axiosClient.interceptors.response.use(
    async (response: AxiosResponse) => {
        return response;
    },

    async (err) => {
        if (err.response && err.response?.data) {
        } else {
            return Promise.reject(err);
        }
        const { statusCode, message } = err.response?.data as any;
        const rf_token = cookieInstance.token.get_refresh_token();

        // if (statusCode === 403) {
        //     window.location.replace(LOGIN_URL);
        // }

        if (statusCode === 401) {
            switch (message) {
                case 'R_TOKEN_NOT_EXIST':
                case 'R_TOKEN_EXPIRED':
                    cookieInstance.token.remove_refresh_token();
                    cookieInstance.token.remove_access_token();

                    directToHome();
                    return Promise.reject(err);

                case 'DATA_NOT_VALIDATE':
                    return Promise.reject(err);
                case 'A_TOKEN_EXPIRED':
                case 'USER_NOT_VALIDATE':
                case 'Unauthorized':
                    if (rf_token) {
                        const {
                            data: { message, accessToken, expired },
                        } = await axiosClient.get(`/renew-token/${rf_token}`);

                        if (message === 'RENEW_SUCCESS') {
                            cookieInstance.token.set_access_token(accessToken, expired);
                            return await axiosClient(err.config);
                        } else {
                            cookieInstance.token.remove_access_token();
                            cookieInstance.token.remove_refresh_token();

                            directToHome();
                        }
                    } else {
                        cookieInstance.token.remove_access_token();
                        directToHome();
                        return Promise.reject(err);
                    }
                    break;

                default:
                    return Promise.reject(err);
            }
        } else {
            return Promise.reject(err);
        }
    }
);

export default axiosClient;
