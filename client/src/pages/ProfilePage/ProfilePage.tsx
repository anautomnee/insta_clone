import {ProfileHeader} from "../../components/ProfileHeader/ProfileHeader.tsx";
import { useRedirectIfNotAuthenticated} from "../../uitls/customHooks.ts";
import { useEffect, useState} from 'react';
import {User} from "../../store/types/instanceTypes.ts";
import {fetchProfile} from "../../uitls/apiCalls.ts";
import {Link, Outlet, useParams} from "react-router";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";

export const ProfilePage = () => {
    const redirected = useRedirectIfNotAuthenticated();
    if (redirected) return null;
    const {username} = useParams();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const user = useSelector((state: RootState) => state.user);
    const token = localStorage.getItem("userToken");


    useEffect(() => {
        const fetchUserFunc = async() => {
            if (!username || !token) return;
            if (user.username !== username) {
                const result = await fetchProfile(username, token);
                setCurrentUser(result);
            } else {
                setCurrentUser(user);
            }
        }
        fetchUserFunc();
    }, [username, user]);

    return (
        <div className="flex flex-col items-center gap-8 my-9 lg:gap-16">
            <div className="w-full text-center border-b border-b-gray md:hidden p-2 font-semibold">
                {currentUser?.username}</div>
            <div className="flex flex-col gap-8 lg:gap-16">
                <ProfileHeader user={currentUser}/>
                <div className="grid grid-cols-3 px-1 sm:px-6 gap-1 sm:gap-2">
                    <Outlet />
                    {currentUser?.posts && currentUser.posts.length > 0 && [...currentUser?.posts].reverse().map((post) => (<div
                        key={post._id}
                        className="aspect-square">
                        <Link to={`post/${post._id}`}>
                            <img
                                src={post.photo}
                                alt={post._id}
                                className="w-full h-full object-cover"
                            />
                        </Link>
                    </div>))}
                </div>
            </div>
        </div>
    );
};