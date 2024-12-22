import { useSelector} from "react-redux";
import { RootState} from "../../store/store.ts";
import {ProfileHeader} from "../../components/ProfileHeader/ProfileHeader.tsx";
import {useFetchUserAfterReload, useRedirectIfNotAuthenticated} from "../../uitls/customHooks.ts";

export const ProfilePage = () => {
    const redirected = useRedirectIfNotAuthenticated();
    if (redirected) return null;
    const user = useSelector((state: RootState) => state.user);
    useFetchUserAfterReload(user);
    return (
        <div className="flex flex-col items-center gap-8 lg:gap-16">
            <div className="w-full text-center border-b border-b-gray md:hidden p-2 font-semibold">
                {user?.username}</div>
            <div className="flex flex-col gap-8 lg:gap-16">
                <ProfileHeader user={user}/>
                <div className="grid grid-cols-3 px-1 sm:px-6 gap-1 sm:gap-2">
                    {user.posts && user.posts.length > 0 && user.posts.map((post) => (<div
                        key={post._id}
                        className="max-w-[307px] max-h-[307px] overflow-hidden">
                        <img
                            src={post.photo}
                            alt="Post"
                            className="w-full h-full object-cover"
                        />
                    </div>))}
                </div>
            </div>
        </div>
    );
};