import axios, { AxiosError } from "axios";
import type {InternalAxiosRequestConfig, AxiosRequestConfig} from "axios";
import { store } from "../store";
import { setTokens, logout } from "../store/authSlice";
import i18n from "../i18n";

interface RefreshResponse {
  id: number;
  authenticationToken: string;
  refreshToken: string;
  inn: string;
  roles: string[];
  menu: {
    parent: string;
    children: string[];
  }[];
  systemLanguage: string;
}

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_TEST,
   headers: {
    "Content-Type": "application/json",
  },
});
console.log("BASE URL:", import.meta.env.VITE_APP_API_TEST);

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers = config.headers ?? {};
    config.headers["Accept-Language"] =
      i18n.resolvedLanguage || i18n.language;

    return config;
  }
);


api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest =
      error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken =
        store.getState().auth.refreshToken;
        console.log("REFRESH:", store.getState().auth.refreshToken);

      if (!refreshToken) {
        store.dispatch(logout());
        return Promise.reject(error);
      }

      try {
        const res = await api.post<RefreshResponse>("/api/v1/auth/refresh-token", 
          {refreshToken}
        );
        
        localStorage.setItem("accessToken", res.data.authenticationToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        store.dispatch(
          setTokens({
            accessToken: res.data.authenticationToken,
            refreshToken: res.data.refreshToken,
          })
        );

        if (originalRequest.headers) {
          originalRequest.headers.Authorization =
            `Bearer ${res.data.authenticationToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);