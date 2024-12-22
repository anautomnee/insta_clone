import { useEffect, useState } from 'react';
import { useNavigate} from "react-router";
import {isTokenExpired} from "./utils.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store/store.ts";
import {logout} from "../store/slices/authSlice.ts";
import {fetchUser} from "../store/actionCreators/userActionCreators.ts";
import {UserState} from "../store/types/userTypes.ts";

export const useRedirectIfAuthenticated = (redirectPath: string = '/') => {
    const navigate = useNavigate();
    const [redirected, setRedirected] = useState(false);
    const token = localStorage.getItem("userToken");

    useEffect(() => {
        if (token) {
            setRedirected(true); // Mark redirection state
            navigate(redirectPath, { replace: true }); // Perform redirection
        }
    }, [token, redirectPath, navigate]);

    return redirected; // Return the redirection state
};

export const useRedirectIfNotAuthenticated = () => {
    const [redirected, setRedirected] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (!token || isTokenExpired(token)) {
            localStorage.removeItem('userToken');
            setRedirected(true);
            dispatch(logout());
            navigate('/login', { replace: true });
        }
    }, []);
    return redirected;
};

export const useScreenWidth = () => {
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return screenWidth;
};

export const useFetchUserAfterReload = (user: UserState): void => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    useEffect(() => {
        if (user.username == '') {
            const id = localStorage.getItem('userId');
            const token = localStorage.getItem('userToken');
            if (!id || !token) {
                navigate('/login');
            } else {
                dispatch(fetchUser({id, token}));
            }
        }
    }, [user]);
}