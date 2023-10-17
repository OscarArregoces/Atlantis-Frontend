import axios from "axios";
import { BASE_URL } from "../environment/env-dev";

export const useAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});
export const useAxiosWithFile = (method, url, data) => {
    switch (method) {
        case 'post':
            return useAxios.post(url, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        case 'patch':
            return useAxios.patch(url, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
        default:
            break;
    }
}

useAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        };
        return config;
    },
    (error) => {
        Promise.reject(error)
    }
);
useAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return error.response;
        // return Promise.reject(error.response.data);
    }
);

