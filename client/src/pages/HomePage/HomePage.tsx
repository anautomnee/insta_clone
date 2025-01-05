import {useRedirectIfNotAuthenticated} from "../../uitls/customHooks.ts";
import {useEffect, useState} from "react";
import {Post} from "../../store/types/instanceTypes.ts";
import {fetchFollowedPosts} from "../../uitls/apiCalls.ts";
import {formatDate} from "../../uitls/utils.ts";
import like from '../../assets/reactions/like.svg';
//import liked from '../../assets/reactions/liked.svg';
import comment from '../../assets/reactions/comment.svg';


export const HomePage = () => {
    const redirected = useRedirectIfNotAuthenticated();
    if (redirected) return null;
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const token = localStorage.getItem("userToken");

    const loadPosts = async () => {
        try {
            if (!token) return;
            const result = await fetchFollowedPosts(token, page);
            if (result.length < 10) setHasMore(false);
            if (page !== 1) {
                setPosts((prevPosts) => [...prevPosts, ...result])
            } else {
                setPosts(result);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        loadPosts();
    }, [page]);

    const loadMore = () => {
        if (hasMore) setPage((prevPage) => prevPage + 1);
    };

    return (
        <div className="flex justify-center my-14 mx-[77px]">
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-6">
                {posts.length > 0 && posts.map((post) => (
                    <div key={post._id} className="border-b border-b-gray">
                        <div className="flex gap-2 mb-3">
                            <img
                                src={post.author.profile_image}
                                alt={post.author.username}
                                className="w-7 h-7 object-cover"
                            />
                            <p className="text-xs font-semibold">{post.author.username}</p>
                            <p className="text-xs text-darkgray">· {post.createdAt && formatDate(new Date(post.createdAt))}</p>
                        </div>
                        <img src={post.photo} alt={`post-${post._id}`}
                            className="w-[420px] h-[420px] object-contain"/>
                        <div className="flex gap-2 mt-1.5 mb-2.5">
                            <img src={like} alt="like" />
                            <img src={comment} alt="comment" />
                        </div>
                        <p className="text-xs font-semibold mb-2">{post.like_count} likes</p>
                        <p className="line-clamp-3 text-xs mb-2 max-w-[420px]"><span className="font-semibold pr-2">
                            {post.author.username}</span>{post.content}</p>
                        <p className="text-darkgray text-xs mb-9">View all comments ({post.comments.length})</p>
                    </div>
                ))}
            </div>
        </div>
    );

};