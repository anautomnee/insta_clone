import {Route, Routes } from "react-router";
import {ErrorPage, HomePage, LoginPage, ProfilePage, RegisterPage, ResetPage} from "../pages";

export const MainRouter = () => {
    return (
        <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/reset" element={<ResetPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="*" element={<ErrorPage/>} />
        </Routes>
    );
};