import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store.ts";
import {ProfileHeader} from "../../components/ProfileHeader/ProfileHeader.tsx";
import { useRedirectIfNotAuthenticated} from "../../uitls/customHooks.ts";
import {PostModal} from "../../components/PostModal/PostModal.tsx";
import {MouseEvent, useEffect, useRef, useState} from 'react';
import {PostState} from "../../store/types/postTypes.ts";
import {fetchPost} from "../../store/actionCreators/postActionCreators.ts";
import {User} from "../../store/types/instanceTypes.ts";
import {fetchProfile} from "../../uitls/apiCalls.ts";
import {useParams} from "react-router";

export const ProfilePage = () => {
    const redirected = useRedirectIfNotAuthenticated();
    if (redirected) return null;
    const {username} = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [currentPost, setCurrentPost] = useState<PostState | null>(null);
    const currentPostRef = useRef<HTMLDivElement>(null);
    const token = localStorage.getItem("userToken");
    const dispatch = useDispatch<AppDispatch>();

    const fetchPostData = async (postId: string) => {
        try {
            if (token) {
                const result = await dispatch(fetchPost({ id: postId, token })).unwrap();
                setCurrentPost(result);
            }
        } catch (err) {
            console.error("Failed to fetch post:", err);
        }
    };
    const openPostModal = async (e: MouseEvent<HTMLImageElement>) => {
        const target = e.target as HTMLImageElement;
        const postId = target.alt;
        if (currentPostRef.current && postId) {
            currentPostRef.current.hidden = false;
            await fetchPostData(postId);
        }
    };

    useEffect(() => {
        const fetchUserFunc = async() => {
            if (!username || !token) return;
            const result = await fetchProfile(username, token);
            setUser(result);
        }
        fetchUserFunc();
    }, [username]);

    return (
        <div className="flex flex-col items-center gap-8 lg:gap-16">
            <div className="w-full text-center border-b border-b-gray md:hidden p-2 font-semibold">
                {user?.username}</div>
            <div className="flex flex-col gap-8 lg:gap-16">
                <ProfileHeader user={user}/>
                <div className="grid grid-cols-3 px-1 sm:px-6 gap-1 sm:gap-2">
                    <div ref={currentPostRef} hidden>
                        <PostModal
                            post={currentPost}
                            currentPostRef={currentPostRef}
                            setCurrentPost={setCurrentPost}
                        />
                    </div>
                    {user?.posts && user.posts.length > 0 && [...user?.posts].reverse().map((post) => (<div
                        key={post._id}
                        className="aspect-square">
                        <img
                            src={post.photo}
                            alt={post._id}
                            className="w-full h-full object-cover"
                            onClick={(e: MouseEvent<HTMLImageElement>) => openPostModal(e)}
                        />
                    </div>))}
                </div>
            </div>
        </div>
    );
};