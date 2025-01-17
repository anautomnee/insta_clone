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


    return (<>
    <div hidden ref={moreRef}>
        <PostMore modalRef={moreRef} postId={post?._id} setPostType={setPostType} />
    </div>
    <div
        className="fixed h-[calc(100vh-81px)] md:min-h-screen top-0 w-screen
            md:w-[calc(100vw-60px)] lgg:w-[calc(100vw-244px)] left-0 md:left-[60px] lgg:left-[244px]"
        style={{backgroundColor: 'rgba(0, 0, 0, 0.65)'}}
        onClick={closeModal}
    >
        <div className="relative flex flex-col md:grid bg-white z-10 opacity-100 md:mt-24 mx-auto rounded
            lgg:grid-cols-[577px_423px] lg:grid-cols-[484px_356px] md:grid-cols-[358px_262px]
            h-[80vh] md:h-fit mt-[6vh]
            lgg:min-w-[1000px] lg:w-[840px] md:w-[620px] w-[90vw]"
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
            <div className="flex justify-center items-center
                 md:border-r border-b md:border-b-0 border-gray lgg:w-[577px] lgg:h-[577px]
                 lg:w-[484px] lg:h-[484px] md:w-[358px] md:h-[358px]
                 max-h-[400px]">
                {post?.photos &&post?.photos?.length > 0 ? <PhotoCarousel photos={post?.photos.map((photoField) => photoField.string64 || "")}/> : <img
                    src={post?.photos[0].string64}
                alt="Post"
                className="w-full h-full object-contain"/>
            }
        </div>
        {postType === "preview" ? <PostMain post={post} setPost={setPost} moreRef={moreRef} /> :
                <EditPostForm postContent={post?.content} postId={post?._id} setPost={setPost} setPostType={setPostType} />}

            </div>
        </div>
    </>
    );
};