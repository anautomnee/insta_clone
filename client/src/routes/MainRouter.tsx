import {
    EditProfilePage,
    ErrorPage,
    ExplorePage,
    HomePage,
    LoginPage, PostPage,
    ProfilePage,
    RegisterPage,
    ResetPage
} from "../pages";
import {MessagesPage} from "../pages/MessagesPage/MessagesPage.tsx";
import {MessagesMain} from "../components/MessagesMain/MessagesMain.tsx";
import { useLocation, Routes, Route } from "react-router";
import {PostModal} from "../components/PostModal/PostModal.tsx";


export const MainRouter = () => {
    const location = useLocation();
    const state = location.state as { backgroundLocation?: Location };

    return (
        <>
            <Routes location={state?.backgroundLocation || location}>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/reset" element={<ResetPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/profile/:username" element={<ProfilePage />} />
                <Route path="/profile/:username/edit" element={<EditProfilePage />} />
                <Route path="/messages" element={<MessagesPage />}>
                    <Route path=":username" element={<MessagesMain />} />
                </Route>
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/post/:postId" element={<PostPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>

            {/* Conditionally render modal if the background location is set */}
            {state?.backgroundLocation && (
                <Routes>
                    <Route
                        path="/post/:postId"
                        element={<PostModal/>}
                    />
                </Routes>
            )}
        </>
    );
};
