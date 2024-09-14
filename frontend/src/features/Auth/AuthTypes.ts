export interface SignupPayload {
    name: string;
    email: string;
    password: string;
    target: string; 
    activity: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    userInfo: {
        id: string;
        name: string;
        email: string;
    };
    error?: string;
}

export interface LogoutPayload {
    token: string;
}