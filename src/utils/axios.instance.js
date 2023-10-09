import axios from "axios";
import { BASE_URL } from "../environment/env-dev";

export const useAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

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

