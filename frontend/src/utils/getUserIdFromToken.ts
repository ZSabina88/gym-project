import { jwtDecode, JwtPayload } from 'jwt-decode';

interface PayloadType extends JwtPayload {
    email: string;
}

export const getUserIdFromToken = (): string | null => {
    const token = localStorage.getItem("userToken");
    if (!token) return null;

    try {
        const decoded = jwtDecode<PayloadType>(token);
        return decoded.email;
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};