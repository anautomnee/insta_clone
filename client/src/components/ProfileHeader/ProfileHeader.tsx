import {User} from "../../store/types/instanceTypes.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {selectIfFollowing} from "../../store/selectors/userSelector.ts";
import {followUser, unfollowUser} from "../../uitls/apiCalls.ts";
import {addFollowing, removeFollowing} from "../../store/slices/userSlice.ts";
import {useEffect, useState} from "react";
import {Link} from "react-router";

export const ProfileHeader= ({user}: {user: User | null}) => {
    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    const isFollowingFromRedux = useSelector((state: RootState) =>
        user ? selectIfFollowing(state, user._id) : false
    );

    useEffect(() => {
        if (user) {
            setIsFollowing(isFollowingFromRedux);
        }
    }, [isFollowingFromRedux, user]);

    const storageUsername = localStorage.getItem("username");
    const ifUser = user ? user.username === storageUsername : false;
    const dispatch = useDispatch<AppDispatch>();
    const token = localStorage.getItem("userToken");

    if (!user) {
        return <div>Loading...</div>;
    }

    const onFollow = async () => {
        try {
            if (!token || !user) return;
            const condensedUser = await followUser(token, user.username);
            dispatch(addFollowing(condensedUser));
            setIsFollowing(true);
        } catch (e) {
            console.error('Error following user', e);
        }
    };

    const onUnfollow = async () => {
        try {
            if (!token || !user) return;
            const condensedUser = await unfollowUser(token, user.username);
            dispatch(removeFollowing(condensedUser));
            setIsFollowing(false);
        } catch (e) {
            console.error('Error unfollowing user', e);
        }
    };

    return (
        <>
            <div className="flex gap-4 px-6 md:gap-12 lg:gap-20">
                <img className="rounded-[50%] border border-gray
                w-28 h-28 md:w-[150px] md:h-[150px]" src={user?.profile_image} alt="Profile pic"/>
                <div>
                    <div className="flex flex-col items-start md:flex-row md:items-center gap-2 mb-3">
                        <p className="text-lg mr-3">{user?.username}</p>
                        {!ifUser ? <div className="flex gap-2 mb-4">
                            {!isFollowing && <button className="rounded-lg bg-blue text-sm text-white
                            h-7 w-20 sm:w-28 md:w-[132px]"
                            onClick={onFollow}>Follow</button>}
                            {isFollowing && <button className="rounded-lg  text-sm bg-[#EFEFEF]
                            h-7 w-20 sm:w-28 md:w-[132px]"
                            onClick={onUnfollow}>Unfollow</button>}
                            <button className="rounded-lg bg-[#EFEFEF] text-sm
                            h-7 w-28 sm:w-36 md:w-[190px]">Message
                            </button>
                        </div> : <Link to={`${window.location.pathname}/edit`}>
                            <button className="rounded-lg bg-[#EFEFEF] text-sm
                            h-7 w-28 sm:w-36 md:w-[190px]">Edit profile
                            </button>
                        </Link>}
                    </div>
                    <div className="flex gap-3.5 sm:gap-8 md:gap-16 md:mb-5 text-sm md:text-md">
                        <p><b>{user?.posts.length}</b> posts</p>
                        <p><b>{user?.followers.length}</b> followers</p>
                        <p><b>{user?.followings.length}</b> following</p>
                    </div>
                    <p className="hidden md:block text-sm w-[434px] break-words">{user?.bio}</p>
                </div>
            </div>
            <p className="md:hidden pl-6 text-sm w-[90vw] break-words">{user?.bio}</p>
        </>
    );
};