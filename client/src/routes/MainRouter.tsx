import {Route, Routes } from "react-router";
import {ErrorPage, HomePage, LoginPage, ProfilePage, RegisterPage, ResetPage} from "../pages";
import {PostModal} from "../components/PostModal/PostModal.tsx";

export const MainRouter = () => {
    return (
        <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/reset" element={<ResetPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/profile/:username" element={<ProfilePage />}>
                <Route path="post/:postId" element={<PostModal />} />
            </Route>
            <Route path="*" element={<ErrorPage/>} />
        </Routes>
    );
};