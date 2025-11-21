import axios from 'axios';
import { getData, setData } from '../storage/asyncStoreUtil';
import { AUTH_TOKEN, ENDPOINTS, REFRESH_TOKEN } from '../constants/constants';
import { LoginResponse } from '../types/listItemType';

let axiosInstance = axios.create({
  baseURL: 'https://postermaker-dev-api.debutinfotech.in/api/auth/v1.0.0/',
  timeout: 10000,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async config => {
    const token = await getData(AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  config => {
    return config;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshTokenApi();
      await refreshTokenApi();
      const newToken = await getData(AUTH_TOKEN);
      if (newToken) {
        await setData(AUTH_TOKEN, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
      }
      return axiosInstance(originalRequest);
    }
  },
);

export default axiosInstance;

const refreshTokenApi = async () => {
  try {
    const refreshToken = await getData(REFRESH_TOKEN);

    const response = await axiosInstance.post(ENDPOINTS.REFRESH_TOKEN, {
      refreshToken,
    });

    const newToken = response.data.accessToken;

    await setData(AUTH_TOKEN, newToken);
  } catch (error) {
    return Promise.reject(error);
  }
};
