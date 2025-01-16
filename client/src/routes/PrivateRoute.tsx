import {ReactNode, useEffect, useState} from "react";
import {Navigate} from "react-router";
import {checkJWTToken} from "../uitls/apiCalls.ts";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const [isNotAuthenticated, setIsNotAuthenticated] = useState<boolean | null>(null);
    useEffect(() => {
        const handleCheck = async () => {
            const response = await checkJWTToken();
            setIsNotAuthenticated(!response);
        }
        handleCheck();
    }, []);
    if (isNotAuthenticated === null) return;
    return isNotAuthenticated ? <Navigate to='/login' replace/> : children;
};
