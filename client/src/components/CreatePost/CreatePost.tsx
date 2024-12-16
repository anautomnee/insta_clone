import { MouseEvent, RefObject } from "react";

interface CreatePostProps {
    divRef: RefObject<HTMLDivElement>;
}

export const CreatePost = ({ divRef }: CreatePostProps) => {
    const closeCreatePost = (e: MouseEvent<HTMLDivElement>) => {
        if (divRef.current) {
            e.stopPropagation();
            divRef.current.hidden = true;
        }
    };

    return (
        <div
            className="bg-[#A6000000]"
            onClick={closeCreatePost} // `e` is inferred to be a MouseEvent here
        >
            <div className="bg-white w-[913px]">
                <p>Create new post</p>
            </div>
        </div>
    );
};
