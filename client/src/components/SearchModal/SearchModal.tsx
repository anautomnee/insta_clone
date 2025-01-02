import {MouseEvent, RefObject} from "react";

type SearchModalProps = {
    modalRef: RefObject<HTMLDivElement>;
}

export const SearchModal = ({modalRef}: SearchModalProps) => {
    const closeCreatePost = (e: MouseEvent<HTMLDivElement>) => {
        if (modalRef.current) {
            e.stopPropagation();
            modalRef.current.hidden = true;
        }
    };
    return (<div
        className="absolute h-[calc(100vh-81px)] md:h-screen top-0 w-screen
            lg:w-[calc(100vw-60px)] left-0 md:left-[60px] lgg:left-[244px]"
        style={{backgroundColor: 'rgba(0, 0, 0, 0.65)'}}
        onClick={closeCreatePost}
    >
            <div className="bg-white opacity-100 h-[calc(100vh-81px)] md:h-screen md:rounded-r-xl
            md:w-[397px] w-full py-5 px-6"
                 onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                <p className="font-semibold text-xl mb-4">Search</p>
            </div>
        </div>
    )
};