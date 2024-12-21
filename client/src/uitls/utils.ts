import {jwtDecode} from 'jwt-decode';

export const isTokenExpired = (token: string): boolean => {
    if (!token) return true;
    try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp) {
            const currentTime = Date.now() / 1000;
            return decodedToken.exp < currentTime;
        } else return true;
    } catch (error) {
        console.error('Error decoding token:', error);
        return true;
    }
};