import {useParams} from "react-router";
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store.ts";
import {fetchPost} from "../../store/actionCreators/postActionCreators.ts";
import {PostMain} from "../../components/PostModal/PostMain.tsx";
import {EditPostForm} from "../../components/PostModal/EditPostForm.tsx";
import {PostMore} from "../../components/PostModal/PostMore.tsx";
import {Post} from "../../store/types/instanceTypes.ts";
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
        <div className="grid md:grid-cols-[1.8fr_1fr] sm:mx-auto mx-6 lgg:w-[933px] lg:w-[820px]
            md:w-[640px] sm:w-[420px] xs:w-[90vw] border border-gray mt-8">
            <div className="flex justify-center items-center
                     md:border-r border-b md:border-b-0 border-gray
                     ">
                <img
                    src={post?.photo}
                    alt="Post"
                    className="md:w-full md:h-full sm:w-80 sm:h-80 object-contain"/>
            </div>
            {postType === "preview" ? <PostMain post={post} setPost={setPost} moreRef={moreRef}/> :
                <EditPostForm postContent={post?.content} postId={post?._id} setPost={setPost} setPostType={setPostType}/>}
        </div>
    </>)
};