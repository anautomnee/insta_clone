import {Route, Routes } from "react-router";
import {ErrorPage, HomePage, LoginPage, ProfilePage, RegisterPage, ResetPage} from "../pages";
import {useSelector} from "react-redux";
import {RootState} from "../store/store.js";
import {useEffect, useState} from "react";

export const MainRouter = () => {
    const {userToken} = useSelector((state:RootState) => state.auth);
    const [token, setToken] = useState<string | null>(userToken);
    useEffect(() => {
        if(userToken) {
            setToken(userToken);
        }
    }, [userToken]);
    return (
        <Routes>
            <Route path="/register" element={<RegisterPage token={token} />} />
            <Route path="/login" element={<LoginPage token={token} />} />
            <Route path="/reset" element={<ResetPage token={token} />} />
            <Route path="/" element={<HomePage token={token}/>} />
            <Route path="/profile" element={<ProfilePage/>} />
            <Route path="*" element={<ErrorPage/>} />
        </Routes>
    );
};