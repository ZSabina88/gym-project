import { jwtDecode, JwtPayload } from 'jwt-decode';

interface PayloadType extends JwtPayload {
    sub: string;
}

export const getUserIdFromToken = (): string | null => {
    const token = localStorage.getItem("userToken");
    if (!token) return null;

    try {
        const decoded = jwtDecode<PayloadType>(token);
        return decoded.sub;
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};