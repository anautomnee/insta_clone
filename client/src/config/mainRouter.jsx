import {Route, Routes } from "react-router";
import {LoginPage, RegisterPage, ResetPage} from "../pages/index.js";

export const MainRouter = () => {
    return (
        <Routes>
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/reset" element={<ResetPage/>} />
        </Routes>
    );
};