import { MouseEvent, useEffect, useRef, useState} from "react";
import { useNavigate, useParams} from "react-router";
import {PostMore} from "./PostMore.tsx";
import {useDispatch, } from "react-redux";
import {AppDispatch, } from "../../store/store.ts";
import {Post} from "../../store/types/instanceTypes.ts";
import {fetchPost} from "../../store/actionCreators/postActionCreators.ts";
import {PostMain} from "./PostMain.tsx";
import {EditPostForm} from "./EditPostForm.tsx";

export const PostModal = () => {
    const [post, setPost] = useState<Post | null>(null);
    const [postType, setPostType] = useState<'preview' | 'edit'>('preview');
    const token = localStorage.getItem("userToken");
    const moreRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch<AppDispatch>();

    const {postId} = useParams();
    const navigate = useNavigate();

    const closeModal = () => {
        navigate(-1); // Go back to the previous route (profile page)
    };

    useEffect(() => {
        const fetchPostFunc = async() => {
            if (!postId || !token) return;
            const result = await dispatch(fetchPost({ id: postId, token })).unwrap();
            setPost(result);
        }
        fetchPostFunc();
    }, [postId]);


    return (<>
    <div hidden ref={moreRef}>
        <PostMore modalRef={moreRef} postId={post?._id} token={token} setPostType={setPostType} />
    </div>
    <div
        className="fixed h-[calc(100vh-81px)] md:min-h-screen top-0 w-screen
            md:w-[calc(100vw-60px)] lgg:w-[calc(100vw-244px)] left-0 md:left-[60px] lgg:left-[244px]"
        style={{backgroundColor: 'rgba(0, 0, 0, 0.65)'}}
        onClick={closeModal}
    >
        <div className="relative flex flex-col md:grid bg-white z-10 opacity-100 md:mt-24 mx-auto rounded
            lgg:grid-cols-[577px_423px] lg:grid-cols-[484px_356px] md:grid-cols-[358px_262px]
            h-[74vh] md:h-fit mt-[8vh]
            lgg:min-w-[1000px] lg:w-[840px] md:w-[620px] w-[90vw]"
             onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                <div className="flex justify-center items-center
                 md:border-r border-b md:border-b-0 border-gray lgg:w-[577px] lgg:h-[577px]
                 lg:w-[484px] lg:h-[484px] md:w-[358px] md:h-[358px]
                 max-h-[420px]">
                    <img
                    src={post?.photo}
                    alt="Post"
                    className="w-full h-full object-contain"/>
                </div>
            {postType === "preview" ? <PostMain post={post} setPost={setPost} moreRef={moreRef} /> :
                <EditPostForm postContent={post?.content}/>}

            </div>
        </div>
    </>
    );
};