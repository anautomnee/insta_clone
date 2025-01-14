import {ProfileHeader} from "../../components/ProfileHeader/ProfileHeader.tsx";
import { useRedirectIfNotAuthenticated} from "../../uitls/customHooks.ts";
import { useEffect, useState} from 'react';
import {User} from "../../store/types/instanceTypes.ts";
import {fetchProfile} from "../../uitls/apiCalls.ts";
import {Link, useLocation, useParams} from "react-router";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {PostModal} from "../../components/PostModal/PostModal.tsx";

export const ProfilePage = () => {
    const redirected = useRedirectIfNotAuthenticated();
    const {username} = useParams();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const user = useSelector((state: RootState) => state.user);
    const location = useLocation();

    const isModal = location.pathname.includes("/post/");

    useEffect(() => {
        const fetchUserFunc = async() => {
            if (!username) return;
            if (user.username !== username) {
                const result = await fetchProfile(username);
                setCurrentUser(result);
            } else {
                setCurrentUser(user);
            }
        }
        fetchUserFunc();
    }, [username, user]);

    if (redirected) return null;

    return (
        <div className="flex flex-col items-center gap-8 mx-auto md:mx-28 md:my-9 lg:gap-16">
            <div className="w-full text-center border-b border-b-gray md:hidden p-2 font-semibold">
                {currentUser?.username}</div>
            <div className="flex flex-col gap-8 lg:gap-16">
                <ProfileHeader user={currentUser} profileUsername={user.username} />
                <div className="grid grid-cols-3 px-1 sm:px-6 gap-1 sm:gap-2">
                    {currentUser?.posts && currentUser.posts.length > 0 && [...currentUser?.posts].reverse().map((post) => (<div
                        key={post._id}
                        className="aspect-square">
                        <Link to={`/post/${post._id}`} state={{ backgroundLocation: location }}>
                            <img
                                src={post.photo}
                                alt={post._id}
                                className="w-full h-full object-cover"
                            />
                        </Link>
                    </div>))}
                </div>
            </div>
            {isModal && <PostModal />}
        </div>
    );
};