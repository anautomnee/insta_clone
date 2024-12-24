import {Dispatch, MouseEvent, RefObject, SetStateAction} from "react";
import {PostState} from "../../store/types/postTypes.ts";

type PostModalProps = {
    post: PostState | null;
    currentPostRef: RefObject<HTMLDivElement>;
    setCurrentPost: Dispatch<SetStateAction<PostState | null>>;
}

export const PostModal = ({post, currentPostRef, setCurrentPost}: PostModalProps) => {

    const closePostModal = (e: MouseEvent<HTMLDivElement>) => {
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
                <div className="w-full">
                    <div className="border-b border-b-gray">
                        <p className="mx-3.5 my-4 text-xs">{post?.author?.username}</p>
                    </div>
                    <div className="mx-3.5 my-3 text-xs">
                        <p>{post?.content}</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};