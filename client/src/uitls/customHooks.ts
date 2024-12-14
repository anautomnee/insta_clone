import { useEffect, useState } from 'react';
import { useNavigate} from "react-router";

export const useRedirectIfAuthenticated = (token: string | null, redirectPath: string = '/') => {
    const navigate = useNavigate();
    const [redirected, setRedirected] = useState(false);

    useEffect(() => {
        if (token) {
            setRedirected(true); // Mark redirection state
            navigate(redirectPath, { replace: true }); // Perform redirection
        }
    }, [token, redirectPath, navigate]);

    return redirected; // Return the redirection state
};

export const useRedirectIfNotAuthenticated = (token: string | null, redirectPath: string = '/login') => {
    const navigate = useNavigate();
    const [redirected, setRedirected] = useState(false);

    useEffect(() => {
        if (!token) {
            setRedirected(true); // Mark redirection state
            navigate(redirectPath, { replace: true }); // Perform redirection
        }
    }, [token, redirectPath, navigate]);

    return redirected; // Return the redirection state
};