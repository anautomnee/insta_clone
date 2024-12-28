import {MouseEvent, RefObject} from "react";

type EditPostProps = {
    modalRef: RefObject<HTMLDivElement>;
}

export const EditPost = ({modalRef}: EditPostProps) => {

    const closeModal = (e: MouseEvent<HTMLDivElement> | MouseEvent<HTMLAnchorElement>) => {
        if (modalRef.current) {
            e.stopPropagation();
            modalRef.current.hidden = true;
        }
    };

    return <div
        className="fixed h-[calc(100vh-81px)] z-50 md:min-h-screen top-0 w-screen
            md:w-[calc(100vw-60px)] lgg:w-[calc(100vw-244px)] left-0 md:left-[60px] lgg:left-[244px]"
        style={{backgroundColor: 'rgba(0, 0, 0, 0.65)'}}
        onClick={closeModal}>
        <div className="bg-white opacity-100 mt-8 md:mt-36 mx-auto rounded-xl
            xl:w-[400px] md:w-[320px] w-[90vw]"
             onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
            <div className="text-center">
                <p className="py-4 border-b border-b-gray text-error font-semibold cursor-pointer">
                    Delete</p>
                <p className="py-4 border-b border-b-gray cursor-pointer">Edit</p>
                <p className="py-4 border-b border-b-gray cursor-pointer"
                    onClick={closeModal}>Go to post</p>
                <p className="py-4 border-b border-b-gray cursor-pointer">Copy link</p>
                <p className="py-4 cursor-pointer"
                   onClick={closeModal}>Cancel</p>
            </div>
        </div>
    </div>;
};