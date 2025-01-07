import {Route, Routes } from "react-router";
import {
    EditProfilePage,
    ErrorPage,
    ExplorePage,
    HomePage,
    LoginPage,
    ProfilePage,
    RegisterPage,
    ResetPage
} from "../pages";
import {PostModal} from "../components/PostModal/PostModal.tsx";
import {MessagesPage} from "../pages/MessagesPage/MessagesPage.tsx";
import {MessagesMain} from "../components/MessagesMain/MessagesMain.tsx";

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
            <Route path="/profile/:username/edit" element={<EditProfilePage />} />
            <Route path="/messages" element={<MessagesPage/>}>
                <Route path=":username" element={<MessagesMain />} />
            </Route>
            <Route path="/explore" element={<ExplorePage/>} />
            <Route path="*" element={<ErrorPage/>} />
        </Routes>
    );
};