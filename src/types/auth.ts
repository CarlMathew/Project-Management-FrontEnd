export interface Role{
    role_id: number;
    role_name: string;
}

export interface CurrentUser{
    user_id: number;
    email: string;
    first_name: string;
    last_name: string;
    full_name: string;
    job_title: string;
    profile_image_path: string | null;
    is_active: boolean;
    roles: Role[];
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthenticationResponse {
    access_token: string;
    token_type: string; 
    expires_in?: number;
}

export interface MessageResponse {
    message: string;
}