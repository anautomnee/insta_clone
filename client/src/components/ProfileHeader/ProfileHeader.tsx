import {User} from "../../store/types/instanceTypes.ts";

export const ProfileHeader= ({user}: {user: User}) => {
    return (
        <>
            <div className="flex gap-4 px-6 md:gap-12 lg:gap-20">
                <img className="rounded-[50%] border border-gray
                w-28 h-28 md:w-[150px] md:h-[150px]" src={user?.profileImage} alt="Profile pic"/>
                <div>
                    <div className="flex flex-col items-start md:flex-row md:items-center gap-2 mb-7">
                        <p className="text-lg mr-3">{user?.username}</p>
                        <div className="flex gap-2">
                            <button className="rounded-lg bg-blue text-sm text-white
                            h-7 w-20 sm:w-28 md:w-[132px]">Follow</button>
                            <button className="rounded-lg bg-[#EFEFEF] text-sm
                            h-7 w-28 sm:w-36 md:w-[190px]">Message</button>
                        </div>
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