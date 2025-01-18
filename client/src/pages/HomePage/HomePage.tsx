import { useEffect, useRef, useState} from "react";
import {Post} from "../../store/types/instanceTypes.ts";
import {fetchFollowedPosts} from "../../uitls/apiCalls.ts";
import {formatDate, isLikedByUser} from "../../uitls/utils.ts";
import like from '../../assets/reactions/like.svg';
import comment from '../../assets/reactions/comment.svg';
import liked from "../../assets/reactions/liked.svg";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {Link, useLocation} from "react-router";
import {onLikePostFromHomepage} from "../../uitls/likeFunctions.ts";
import search from '../../assets/nav_icons/search/search.svg';
import notifications_icon from '../../assets/nav_icons/notifications/notifications.svg';
import {SearchModal} from "../../components/SearchModal/SearchModal.tsx";
import {NotificationsModal} from "../../components/NotificationsModal/NotificationsModal.tsx";
import done from '../../assets/done.png';


export const HomePage = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
    const {_id, notifications} = useSelector((state: RootState) => state.user);
    const location = useLocation();


    useEffect(() => {
        const loadPosts = async (): Promise<void> => {
            try {
                const result: Post[] = await fetchFollowedPosts(page);

                // Update posts state and remove duplicates
                setPosts((prevPosts) => {
                    const newPosts = result?.filter(
                        (newPost) => !prevPosts?.some((post) => post._id === newPost._id)
                    );
                    return newPosts ? [...prevPosts, ...newPosts] : [...prevPosts];
                });

                // Check if there are more posts to load
                if (result?.length < 10) setHasMore(false);
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

    return (
        <div className="flex flex-col justify-center">
            <div className="flex justify-between md:hidden p-3 border-b border-b-gray">
                <p className="w-14"></p>
                <p className="font-semibold">Homepage</p>
                <div className="flex gap-2">
                    <img src={search} alt="Search" onClick={() => setIsSearchOpen(!isSearchOpen)} />
                    <img src={notifications_icon} alt="Notifications" onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} />
                </div>
            </div>
            <div className={isSearchOpen ? "opacity-100" : "opacity-0 invisible"}>
                <SearchModal isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
            </div>
            <div className={isNotificationsOpen ? "opacity-100" : "opacity-0 invisible"}>
                <NotificationsModal
                    isNotificationsOpen={isNotificationsOpen}
                    setIsNotificationsOpen={setIsNotificationsOpen}
                    notifications={notifications}/>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2
             gap-x-10 gap-y-6 my-6 md:my-14 mx-[5vw] sm:mx-auto">
                {posts?.length > 0 && posts.map((post) => (
                    <div key={post._id}
                         className={`border-b border-b-gray max-w-[473px] md:h-[670px]`}>
                        <Link to={`/profile/${post.author.username}`} className="flex gap-2 mb-3 cursor-pointer">
                            <img
                                src={post.author.profile_image}
                                alt={post.author.username}
                                className="w-7 h-7 object-cover"
                            />
                            <p className="text-xs font-semibold">{post.author.username}</p>
                            <p className="text-xs text-darkgray">· {post.createdAt && formatDate(new Date(post.createdAt))}</p>
                        </Link>
                        <div className="relative aspect-square">
                            <Link to={`/post/${post._id}`} state={{backgroundLocation: location}}>
                                <img
                                    src={post.photos[0].string64}
                                    alt={post._id}
                                    className="w-full h-full object-cover"
                                />
                            </Link>
                            {post.photos.length > 1 &&
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                     width="24px" fill="#FFF"
                                     className="absolute top-3 right-3">
                                    <path
                                        d="M240-400v80h-80q-33 0-56.5-23.5T80-400v-400q0-33 23.5-56.5T160-880h400q33 0 56.5 23.5T640-800v80h-80v-80H160v400h80ZM400-80q-33 0-56.5-23.5T320-160v-400q0-33 23.5-56.5T400-640h400q33 0 56.5 23.5T880-560v400q0 33-23.5 56.5T800-80H400Zm0-80h400v-400H400v400Zm200-200Z"/>
                                </svg>}
                        </div>
                        <div className="flex gap-2 mt-1.5 mb-2.5">
                            <img src={_id && post?.likes && isLikedByUser(post?.likes, _id) ? liked : like}
                                 alt='like'
                                 className="w-6 h-6 cursor-pointer"
                                 onClick={async (e) => onLikePostFromHomepage(e, post._id, setPosts)}/>
                            <Link to={`/post/${post._id}`} state={{backgroundLocation: location}}>
                                <img src={comment} alt="comment"/>
                            </Link>
                        </div>
                        <p className="text-xs font-semibold mb-2">{post.like_count} likes</p>
                        {post?.content?.length < 82 ?
                            <p className="text-xs mb-2 max-w-[420px]"><span className="font-semibold pr-2">
                            {post.author.username}</span>{post.content}</p> :
                            <div>
                                <p className="text-xs mb-2 max-w-[420px]"><span className="font-semibold pr-2">
                            {post.author.username}</span>{post.content.slice(0, 82)}
                                    <span className="text-darkgray cursor-pointer"
                                          onClick={(e) => {
                                              const target = e.target as HTMLElement;
                                              const contentP = target.parentElement as HTMLElement;
                                              const fullText = contentP.nextElementSibling as HTMLElement;
                                              contentP.hidden = true;
                                              fullText.hidden = false;
                                          }}>  ...more</span></p>
                                <p hidden className=" text-xs mb-2 max-w-[420px]"><span className="font-semibold pr-2">
                            {post?.author?.username}</span>{post.content}
                                    <span className="text-darkgray cursor-pointer"
                                          onClick={(e) => {
                                              const target = e.target as HTMLElement;
                                              const contentP = target.parentElement as HTMLElement;
                                              const shortenedText = contentP.previousElementSibling as HTMLElement;
                                              contentP.hidden = true;
                                              shortenedText.hidden = false;
                                          }}>  ...less</span></p>
                            </div>}
                        <p className="text-darkgray text-xs mb-9">View all comments ({post.comments.length})</p>
                    </div>
                ))}
                <div ref={loadMoreRef} className="load-more-trigger"></div>
            </div>
            {!hasMore && (<div className="flex flex-col items-center mx-auto pb-16">
                <img src={done} alt='done' className="mb-2.5"/>
                <p>You've seen all the posts</p>
                <p className="text-xs text-darkgray">You have viewed all the posts from followed users</p>
            </div>)}
        </div>
    );
};