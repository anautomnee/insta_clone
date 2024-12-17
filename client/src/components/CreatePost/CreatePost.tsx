import { MouseEvent, RefObject } from "react";
import {Link} from "react-router";
import {UserInfoAuthType} from "../../store/types/authTypes.ts"

interface CreatePostProps {
    divRef: RefObject<HTMLDivElement>;
    userInfo: UserInfoAuthType | null;
}

export const CreatePost = ({ divRef, userInfo }: CreatePostProps) => {
    const closeCreatePost = (e: MouseEvent<HTMLDivElement>) => {
        if (divRef.current) {
            e.stopPropagation();
            divRef.current.hidden = true;
        }
    };

    return (
        <div
            className="absolute h-screen top-0 w-screen md:w-[calc(100vw-244px)] left-0 md:left-[244px]"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}
            onClick={closeCreatePost} // `e` is inferred to be a MouseEvent here
        >
            <div className="bg-white opacity-100 mt-36 mx-auto rounded-xl xl:w-[913px] lg:w-[720px] md:w-[510px] w-[90vw]"
            onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                <div className="flex border-b border-b-gray">
                    <p>Create new post</p>
                    <p>Share</p>
                </div>
                <div>
                    <div></div>
                    <div>
                        <Link
                            to={`profile/${userInfo?.id}`}
                        >
                            <div className="flex items-center gap-4 mt-12">
                                <img
                                    src={userInfo?.profile_image}
                                    alt="Profile image"
                                    className="w-6 h-6 rounded-[50%] border border-gray"
                                />
                                <p className="font-semibold">Profile</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
