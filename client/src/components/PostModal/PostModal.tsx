import {Dispatch, MouseEvent, RefObject, SetStateAction} from "react";
import {PostState} from "../../store/types/postTypes.ts";
import {Link} from "react-router";
import {formatDate} from "../../uitls/utils.ts";

type PostModalProps = {
    post: PostState | null;
    currentPostRef: RefObject<HTMLDivElement>;
    setCurrentPost: Dispatch<SetStateAction<PostState | null>>;
}

export const PostModal = ({post, currentPostRef, setCurrentPost}: PostModalProps) => {

    const closePostModal = (e: MouseEvent<HTMLDivElement> | MouseEvent<HTMLAnchorElement>) => {
        if (currentPostRef.current) {
            e.stopPropagation();
            setCurrentPost(null);
            currentPostRef.current.hidden = true;
        }
    };

    return (<div
        className="fixed h-[calc(100vh-81px)] md:min-h-screen top-0 w-screen
            lg:w-[calc(100vw-60px)] lgg:w-[calc(100vw-244px)] left-0 md:left-[60px] lgg:left-[244px]"
        style={{backgroundColor: 'rgba(0, 0, 0, 0.65)'}}
        onClick={closePostModal}
    >
        <div className="bg-white opacity-100 mt-8 md:mt-36 mx-auto rounded
            xl:w-[913px] lg:w-[720px] lgg:w-[1000px] md:w-[510px] w-[90vw]"
             onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
            <div className="flex">
                <div className="flex justify-center items-center
                 border-r border-gray min-w-[577px] min-h-[577px]">
                    <img
                    src={post?.photo}
                    alt="Post"
                    className="w-full h-full object-contain"/>
                </div>
                <div className="w-full pr-6">
                    <div className="border-b border-b-gray">
                        <Link
                            to={`/profile/${post?.author?._id}`}
                            onClick={closePostModal}
                        >
                            <div className="flex items-center gap-3 mx-3.5 my-4 text-xs">
                                <img
                                    src={post?.author?.profile_image}
                                    alt="Profile image"
                                    className="w-6 h-6 rounded-[50%] border border-gray"
                                />
                                <span className="font-semibold">{post?.author?.username}</span>
                            </div>
                        </Link>
                    </div>
                    <div className="flex gap-3 mx-3.5 my-3 text-xs">
                        <Link
                            to={`/profile/${post?.author?._id}`}
                            onClick={closePostModal}
                        >
                            <img
                                src={post?.author?.profile_image}
                                alt="Profile image"
                                className="min-w-6 h-6 rounded-[50%] border border-gray"
                            />
                        </Link>
                        <div className="flex-col">
                            <p>
                                <Link
                                    to={`/profile/${post?.author?._id}`}
                                    onClick={closePostModal}
                                >
                                    <span className="font-semibold">{post?.author?.username}</span>
                                </Link>
                                <span>   </span>
                                {post?.content}
                            </p>
                            {post?.createdAt && <p className="text-darkgray text-[11px] mt-2">
                                {formatDate(new Date(post?.createdAt))}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};