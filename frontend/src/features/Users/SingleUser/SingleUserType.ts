export interface User {
    id: string;
    name: string;
    email: string;
    activity: string;
    target: string;
    role: string;
}

export interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null | undefined;
}

export interface UserInfo {
    name: string;
    target: string;
    activity: string;
}

export interface ChangeInfoState {
    changeInfo: UserInfo | null;
    loading: boolean;
    error: string | null | undefined;
}

export interface UserPayload {
    name: string;
    target: string;
    activity: string;
}