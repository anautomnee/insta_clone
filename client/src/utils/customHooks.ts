import { useEffect, useState } from 'react';
import { useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store/store.ts";
import {fetchUser} from "../store/actionCreators/userActionCreators.ts";
import {UserState} from "../store/types/userTypes.ts";
import {axiosInstance} from "./apiCalls";
import {AxiosError} from "axios";

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
        const checkToken = async () => {
            try {
                if (user.username == '') {
                    // API call to validate the token
                    const {data} = await axiosInstance.get('/auth/check-access-token');
                    dispatch(fetchUser({username: data.username}));
                }
            } catch (error) {
                if (error instanceof AxiosError && error.response?.status === 401) {
                    // Token is invalid or expired
                    navigate('/login', { replace: true }); // Redirect to login
                } else {
                    console.error('Unexpected error during auth check:', error);
                }
            }
        };

        checkToken();
    }, [user]);
};


const useScrollToTop = () => {
    useEffect(() => {
        // Scroll to the top of the page when the component renders
        window.scrollTo({
            top: 0, // Smooth scroll to the top
        });
    }, []); // Empty dependency array ensures it runs only on mount
};

export default useScrollToTop;
