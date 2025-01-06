import {useRedirectIfNotAuthenticated} from "../../uitls/customHooks.ts";
import { useEffect, useRef, useState} from "react";
import {Post} from "../../store/types/instanceTypes.ts";
import {fetchFollowedPosts} from "../../uitls/apiCalls.ts";
import {formatDate, isLikedByUser} from "../../uitls/utils.ts";
import like from '../../assets/reactions/like.svg';
import comment from '../../assets/reactions/comment.svg';
import liked from "../../assets/reactions/liked.svg";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {Link} from "react-router";
import {onLikePostFromHomepage} from "../../uitls/likeFunctions.ts";
import search from '../../assets/nav_icons/search/search.svg';
import notifications_icon from '../../assets/nav_icons/notifications/notifications.svg';
import {SearchModal} from "../../components/SearchModal/SearchModal.tsx";
import {NotificationsModal} from "../../components/NotificationsModal/NotificationsModal.tsx";


export const HomePage = () => {
    const redirected = useRedirectIfNotAuthenticated();
    if (redirected) return null;
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const notificationsRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const token = localStorage.getItem("userToken");
    const {_id, notifications} = useSelector((state: RootState) => state.user);


    useEffect(() => {
        const loadPosts = async (): Promise<void> => {
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
        loadPosts();
    }, [page]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 1.0 }
        );

        if (loadMoreRef.current) observer.observe(loadMoreRef.current);

        return () => {
            if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
        };
    }, [hasMore]);

    const showNotifications = () => {
        if(notificationsRef.current) {
            notificationsRef.current.hidden = false;
        }
    };

    const showSearch = () => {
        if(searchRef.current) {
            searchRef.current.hidden = false;
        }
    };

    return (
        <div className="flex flex-col justify-center">
            <div className="flex justify-between md:hidden p-3 border-b border-b-gray">
                <p className="w-14"></p>
                <p className="font-semibold">Homepage</p>
                <div className="flex gap-2">
                    <img src={search} alt="Search" onClick={showSearch} />
                    <img src={notifications_icon} alt="Notifications" onClick={showNotifications} />
                </div>
            </div>
            <div ref={searchRef} hidden>
                <SearchModal modalRef={searchRef}/>
            </div>
            <div ref={notificationsRef} hidden>
                <NotificationsModal modalRef={notificationsRef} notifications={notifications}/>
            </div>
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 my-6 md:my-14 mx-[5vw] md:mx-[77px]">
                {posts.length > 0 && posts.map((post, index) => (
                    <div key={post._id}
                         className={`border-b border-b-gray ${index === posts.length - 1 ? "mr-auto" : ""}`}>
                        <Link to={`/profile/${post.author.username}`} className="flex gap-2 mb-3 cursor-pointer">
                            <img
                                src={post.author.profile_image}
                                alt={post.author.username}
                                className="w-7 h-7 object-cover"
                            />
                            <p className="text-xs font-semibold">{post.author.username}</p>
                            <p className="text-xs text-darkgray">· {post.createdAt && formatDate(new Date(post.createdAt))}</p>
                        </Link>
                        <Link to={`/profile/${post.author.username}/post/${post._id}`}>
                            <img src={post.photo} alt={`post-${post._id}`}
                                 className="w-[420px] h-[420px] object-contain cursor-pointer"/>
                        </Link>
                        <div className="flex gap-2 mt-1.5 mb-2.5">
                            <img src={_id && post?.likes && isLikedByUser(post?.likes, _id) ? liked : like}
                                 alt='like'
                                 className="w-6 h-6 cursor-pointer"
                                 onClick={async (e) => onLikePostFromHomepage(e, post._id, setPosts)}/>
                            <img src={comment} alt="comment"/>
                        </div>
                        <p className="text-xs font-semibold mb-2">{post.like_count} likes</p>
                        <p className="line-clamp-3 text-xs mb-2 max-w-[420px]"><span className="font-semibold pr-2">
                            {post.author.username}</span>{post.content}</p>
                        <p className="text-darkgray text-xs mb-9">View all comments ({post.comments.length})</p>
                    </div>
                ))}
                <div ref={loadMoreRef} className="load-more-trigger"></div>
            </div>
        </div>
    );

};