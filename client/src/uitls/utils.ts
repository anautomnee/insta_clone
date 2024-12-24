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

export const formatDate = (date: Date | null | undefined ) => {
    const now = Date.now();
    if (date) {
        const diffTime = Math.abs(now - date.getTime());
        const diffSeconds = Math.floor(diffTime/1000);
        if (diffSeconds <= 60) {
            return `${diffSeconds}s`;
        }

        const diffMinutes = Math.floor(diffTime/(1000*60));
        if (diffMinutes <= 60) {
            return `${diffMinutes}m`;
        }

        const diffHours = Math.floor(diffTime/(1000*60 * 60));
        if (diffHours <= 24) {
            return `${diffHours}h`;
        }

        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 6) {
            return `${diffDays}d`;
        }

        const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
        return `${diffWeeks}w`;
    }
    return;
}