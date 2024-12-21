import {useSelector} from "react-redux";
import { RootState} from "../../store/store.ts";
import {ProfileHeader} from "../../components/ProfileHeader/ProfileHeader.tsx";
import {useRedirectIfNotAuthenticated} from "../../uitls/customHooks.ts";

export const ProfilePage = () => {
    const redirected = useRedirectIfNotAuthenticated();
    if (redirected) return null;
    const user = useSelector((state: RootState) => state.user);
    return (
        <div className="flex flex-col items-center gap-16">
            <div className="flex flex-col gap-16">
                <ProfileHeader user={user}/>
                <div className="grid grid-cols-3 gap-2">
                    {user.posts && user.posts.length > 0 && user.posts.map((post) => (<div
                        key={post._id}
                        className="w-[307px] h-[307px] overflow-hidden">
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