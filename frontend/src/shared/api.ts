import axios from "axios";

type TokenGetter = () => string | null;
type RefreshFn = () => Promise<string>;

let getToken: TokenGetter = () => null;
let refreshToken: RefreshFn = async () => "";

export const configureApi = (getter: TokenGetter, refresher: RefreshFn) => {
    getToken = getter;
    refreshToken = refresher;
};

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

let isRefreshing = false;
let refreshQueue: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
    refreshQueue.push(cb);
};

const onRefreshed = (token: string) => {
    refreshQueue.forEach((cb) => cb(token));
    refreshQueue = [];
};

api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve) => {
                    subscribeTokenRefresh((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(api(originalRequest));
                    });
                });
            }

            isRefreshing = true;
            try {
                const newToken = await refreshToken();
                onRefreshed(newToken);
                isRefreshing = false;
                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                return api(originalRequest);
            } catch (err) {
                isRefreshing = false;

                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default api;