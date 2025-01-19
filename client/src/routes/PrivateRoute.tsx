import {ReactNode, useEffect, useState} from "react";
import {Navigate, useLocation} from "react-router";
import {checkJWTToken} from "../uitls/apiCalls.ts";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const [isNotAuthenticated, setIsNotAuthenticated] = useState<boolean | null>(null);
    const location = useLocation();
    useEffect(() => {
        const handleCheck = async () => {
            const response = await checkJWTToken();
            setIsNotAuthenticated(!response);
        }
        handleCheck();
    }, [[location.pathname]]);
    if (isNotAuthenticated === null) return;
    return isNotAuthenticated ? <Navigate to='/login' replace/> : children;
};
