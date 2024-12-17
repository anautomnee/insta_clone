import { MouseEvent, RefObject } from "react";
import {Link} from "react-router";
import {UserInfoAuthType} from "../../store/types/authTypes.ts";
import upload from '../../assets/upload.png';
import arrow_back from '../../assets/arrow_back.svg';

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
                <div className="flex justify-between p-4 border-b border-b-gray">
                    <img
                        src={arrow_back}
                        alt="Back"
                        className="cursor-pointer"
                        onClick={closeCreatePost} />
                    <p className="font-semibold">Create new post</p>
                    <p className="text-blue">Share</p>
                </div>
                <div className="flex flex-col md:flex-row">
                    <div className="flex items-center justify-center
                    h-[75vw]
                    md:w-[280px] md:h-[280px]
                    lg:w-[420px] lg:h-[420px]
                    xl:w-[520px] xl:h-[520px]
                    bg-lightgray">
                        <img src={upload} alt="upload" />
                    </div>
                    <div className="flex flex-col px-4 py-6">
                        <Link
                            to={`profile/${userInfo?.id}`}
                        >
                            <div className="flex items-center gap-4">
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
