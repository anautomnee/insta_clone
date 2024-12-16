import {User} from "../../store/types/instanceTypes.ts";

export const ProfileHeader= ({user}: {user: User}) => {
    return (
        <div>
            <img className="w-[150px]" src={user?.profileImage} alt="Profile pic"/>
            <p>name -{user?.fullName}</p>
        </div>
    );
};