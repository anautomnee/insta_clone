import {ReactNode, useEffect, useState} from "react";
import {Navigate, useLocation} from "react-router";
import {checkJWTToken} from "../uitls/apiCalls.ts";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const [isNotAuthenticated, setIsNotAuthenticated] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const location = useLocation();
    useEffect(() => {
        const handleCheck = async () => {
            const response = await checkJWTToken();
            setIsNotAuthenticated(!response);
            setIsLoading(false);
        }
        handleCheck();
    }, [[location.pathname]]);
    if (isNotAuthenticated === null) return;
    if (isLoading) {
        return <div>Loading...</div>; // Пока идет проверка токена, можно показать загрузочный экран
    }

    return isNotAuthenticated ? (
        <Navigate to="/Login" replace />
    ) : (
        children
    );
};
