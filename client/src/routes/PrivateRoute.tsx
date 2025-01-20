import {ReactNode, useEffect, useState} from "react";
import {Navigate, useLocation} from "react-router";
import {checkJWTToken} from "../uitls/apiCalls.ts";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const [isNotAuthenticated, setIsNotAuthenticated] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Состояние загрузки токена
    const location = useLocation();

    useEffect(() => {
        const handleCheck = async () => {
            const response = await checkJWTToken();
            setIsNotAuthenticated(!response);
            setIsLoading(false); // После завершения проверки устанавливаем состояние загрузки в false
        };

        handleCheck();
    }, [location.pathname]);

    if (isLoading) {
        return <div>Loading...</div>; // Пока идет проверка токена, можно показать загрузочный экран
    }

    return isNotAuthenticated ? (
        <Navigate to="/Login" replace />
    ) : (
        children
    );
};