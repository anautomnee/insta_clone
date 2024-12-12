import {Route, Routes } from "react-router";
import {RegisterPage} from "../pages/index.js";

export const MainRouter = () => {
    return (
        <Routes>
            <Route path="/register" element={<RegisterPage/>} />
        </Routes>
    );
};