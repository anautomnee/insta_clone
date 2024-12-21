import {Route, Routes } from "react-router";
import {ErrorPage, HomePage, LoginPage, ProfilePage, RegisterPage, ResetPage} from "../pages";

export const MainRouter = () => {
    const token = localStorage.getItem("userToken");
    return (
        <Routes>
            <Route path="/register" element={<RegisterPage token={token} />} />
            <Route path="/login" element={<LoginPage token={token} />} />
            <Route path="/reset" element={<ResetPage token={token} />} />
            <Route path="/" element={<HomePage token={token}/>} />
            <Route path="/profile/:id" element={<ProfilePage token={token} />} />
            <Route path="*" element={<ErrorPage/>} />
        </Routes>
    );
};