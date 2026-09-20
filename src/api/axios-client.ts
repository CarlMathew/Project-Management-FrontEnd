import axios, {
    AxiosError,
} from "axios";

import type { InternalAxiosRequestConfig } from "axios"

import {
    clearAccessToken,
    getAccessToken,
    setAccessToken
} from "@/lib/access-token";

import type { AuthenticationResponse } from "@/types/auth";


const baseURL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

const refreshClient = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

interface RetryableRequest extends InternalAxiosRequestConfig {
    _retry?: boolean
}

let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
    const response = await refreshClient.post<AuthenticationResponse>(
        "/auth/refresh"
    )

    const token = response.data.access_token;
    
    setAccessToken(token);

    return token;
}


api.interceptors.request.use((config) => {
    const token = getAccessToken()

    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})


api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        
        const originalRequest = error.config as RetryableRequest | undefined;

        if (
            error.response?.status !== 401 ||
            !originalRequest || 
            originalRequest._retry ||
            originalRequest.url?.includes("/auth/login") ||
            originalRequest.url?.includes("/auth/refresh")
        ) {
            return Promise.reject(error)
        }

        originalRequest._retry = true;

        try{
            refreshPromise ??= refreshAccessToken()
            const token = await refreshPromise;

            originalRequest.headers.Authorization = `Bearer ${token}`

            return api(originalRequest)

        } catch(refreshError){
            clearAccessToken()

            return Promise.reject(refreshError)
        } finally{
            refreshPromise = null;
        }
    }
)