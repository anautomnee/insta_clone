import {useParams} from "react-router";
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store.ts";
import {fetchPost} from "../../store/actionCreators/postActionCreators.ts";
import {PostMain} from "../../components/PostModal/PostMain.tsx";
import {EditPostForm} from "../../components/PostModal/EditPostForm.tsx";
import {PostMore} from "../../components/PostModal/PostMore.tsx";
import {Post} from "../../store/types/instanceTypes.ts";
import {PhotoCarousel} from "../../components/PhotoCarousel/PhotoCarousel.tsx";
//import {useRedirectIfNotAuthenticated} from "../../uitls/customHooks.ts";

export const PostPage = () => {
    //const redirected = useRedirectIfNotAuthenticated();
    const {postId} = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const [postType, setPostType] = useState<'preview' | 'edit'>('preview');
    const moreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchPostFunc = async() => {
            if (!postId) return;
            const result = await dispatch(fetchPost({ id: postId })).unwrap();
            setPost(result);
        }
        fetchPostFunc();
    }, [postId]);

    //if(redirected) return null;

    return(<>
        <div hidden ref={moreRef}>
            <PostMore modalRef={moreRef} postId={post?._id} setPostType={setPostType}/>
        </div>
        <div className="mx-auto w-[90vw] md:w-fit max-h-[80vh] my-9">
            <div className="flex flex-col md:flex-row justify-center border border-gray overflow-auto h-full">
                <div className="flex justify-center items-center md:min-w-[280px] lg:min-w-[353px] md:max-w-[460px]
                        max-h-[360px] md:max-h-[680px]">
                    {post?.photos && post?.photos?.length > 1 ?
                        <PhotoCarousel photos={post?.photos.map((photoField) => photoField.url || "")}/> : <img
                            src={post?.photos[0].url}
                            alt="Post"
                            className="h-full w-full object-contain"/>
                    }
                </div>
                {postType === "preview" ? <div className="relative border-l  border-gray
                        w-full  md:min-h-full md:w-[423px] overflow-y-auto">
                        <PostMain post={post} setPost={setPost} moreRef={moreRef}/></div> :
                    <EditPostForm postContent={post?.content} postId={post?._id} setPost={setPost}
                                  setPostType={setPostType}/>}
            </div>
        </div>
    </>)
};