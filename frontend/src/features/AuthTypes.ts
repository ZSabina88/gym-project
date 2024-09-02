export interface SignupPayload {
    name: string;
    email: string;
    password: string;
    target: "Lose Weight" | "Gain Weight"; 
    activity: "GYM" | "Yoga" | "Cycling";
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