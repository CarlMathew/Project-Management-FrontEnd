import { api } from "@/api/axios-client";
import type {
    AuthenticationResponse,
    CurrentUser,
    LoginRequest,
    MessageResponse
} from "@/types/auth"


export async function login(
    payload:LoginRequest
) {
    const response = await api.post<AuthenticationResponse>(
        "/auth/login",
        payload
    )

    return response.data
    
}


export async function refreshSession() {
    const response = await api.post<AuthenticationResponse>(
        "/auth/refresh",
    )

    return response.data
    
}


export async function getCurrentUser() {
    const response = await api.get<CurrentUser>(
        "/auth/me"
    )

    return response.data
}


export async function logout() {
    const response = await api.post<MessageResponse>(
        "/auth/logout"
    )

    return response.data
}



export async function logoutAll() {
    const response = await api.post<MessageResponse>(
        "/auth/logout-all"
    )

    return response.data
}