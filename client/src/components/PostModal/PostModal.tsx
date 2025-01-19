import { MouseEvent, useEffect, useRef, useState} from "react";
import { useNavigate, useParams} from "react-router";
import {PostMore} from "./PostMore.tsx";
import {useDispatch, } from "react-redux";
import {AppDispatch, } from "../../store/store.ts";
import {Post} from "../../store/types/instanceTypes.ts";
import {fetchPost} from "../../store/actionCreators/postActionCreators.ts";
import {PostMain} from "./PostMain.tsx";
import {EditPostForm} from "./EditPostForm.tsx";
import more from "../../assets/more.svg";
import arrow_back from "../../assets/arrow_back.svg";
import {PhotoCarousel} from "../PhotoCarousel/PhotoCarousel.tsx";

export const PostModal = () => {
    const [post, setPost] = useState<Post | null>(null);
    const [postType, setPostType] = useState<'preview' | 'edit'>('preview');
    const moreRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch<AppDispatch>();

    const {postId} = useParams();
    const navigate = useNavigate();

    const closeModal = () => {
        navigate(-1); // Go back to the previous route (profile page)
    };

    useEffect(() => {
        const fetchPostFunc = async() => {
            if (!postId) return;
            const result = await dispatch(fetchPost({ id: postId })).unwrap();
            setPost(result);
        }
        fetchPostFunc();
    }, [postId]);


    return (
    <>
        <div hidden ref={moreRef}>
            <PostMore modalRef={moreRef} postId={post?._id} setPostType={setPostType} />
        </div>
        <div
            className="fixed z-20 h-[calc(100vh-81px)] md:min-h-screen top-0 w-screen
                md:w-[calc(100vw-60px)] lgg:w-[calc(100vw-244px)] left-0 md:left-[60px] lgg:left-[244px]"
            style={{backgroundColor: 'rgba(0, 0, 0, 0.65)'}}
            onClick={closeModal}>
            <div className="flex justify-center items-center h-full w-full">
                <div className="flex flex-col h-[80vh] mx-6 opacity-100 z-10 rounded bg-white"
                     onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                    <div className="md:hidden flex w-full justify-between border-b border-b-gray px-4 py-2 font-semibold">
                        <img
                            src={arrow_back}
                            alt="Back"
                            className="cursor-pointer"
                            onClick={closeModal}/>
                        {post?.author.username}
                        <img
                            src={more}
                            alt="More"
                            className="justify-self-end"
                            onClick={() => {
                                if (moreRef.current) {
                                    moreRef.current.hidden = false;
                                }
                            }}
                        />
                    </div>
                    <div className="flex h-full">
                        <div className="md:border-r border-b md:border-b-0 border-gray">
                            {post?.photos && post?.photos?.length > 0 ? <PhotoCarousel photos={post?.photos.map((photoField) => photoField.url || "")}/> : <img
                                src={post?.photos[0].url}
                            alt="Post"
                            className="w-full h-full object-contain"/>
                        }
                    </div>
                    {postType === "preview" ? <div className="relative w-[423px] overflow-y-auto">
                            <PostMain post={post} setPost={setPost} moreRef={moreRef} /></div> :
                        <EditPostForm postContent={post?.content} postId={post?._id} setPost={setPost} setPostType={setPostType} />}
                    </div>
                </div>
            </div>
        </div>
    </>
    );
};