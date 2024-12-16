import {User} from "../../store/types/instanceTypes.ts";

export const ProfileHeader= ({user}: {user: User}) => {
    return (
        <div className="flex gap-20">
            <img className="rounded-[50%] border border-gray w-[150px]" src={user?.profileImage} alt="Profile pic"/>
            <div>
                <div className="flex items-center gap-2 mb-7">
                    <p className="text-lg mr-3">{user?.username}</p>
                    <button className="rounded-lg bg-blue text-sm text-white h-8 w-[132px]">Follow</button>
                    <button className="rounded-lg bg-[#EFEFEF] text-sm h-8 w-[190px]">Message</button>
                </div>
                <div className="flex gap-16 mb-5">
                    <p><b>{user?.posts.length}</b> posts</p>
                    <p><b>{user?.followers.length}</b> followers</p>
                    <p><b>{user?.followings.length}</b> following</p>
                </div>
                <p className="text-sm w-[434px]">{user?.bio}</p>
            </div>
        </div>
    );
};