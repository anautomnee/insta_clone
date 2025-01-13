import {useEffect, useRef, useState} from "react";
import { getRandomPosts} from "../../uitls/apiCalls.ts";
import {Post} from "../../store/types/instanceTypes.ts";
import {Link} from "react-router";
import useScrollToTop from "../../uitls/customHooks.ts";

export const ExplorePage = () => {
    const [photos, setPhotos] = useState<Post[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const token = localStorage.getItem("userToken");
    useScrollToTop();

    const loadPosts = async (): Promise<void> => {
        try {
            if (!token || isFetching) return; // Prevent redundant fetches
            setIsFetching(true); // Set fetching state to true
            const fetchCount = window.innerHeight > window.innerWidth && photos.length === 0 ? 20 : 10;
            const result: Post[] = await getRandomPosts(token, fetchCount);

            // Update photos state and remove duplicates
            setPhotos((prevPosts) => [...prevPosts, ...result]);

            setIsFetching(false);
            setIsInitialLoading(false);
        } catch (error) {
            console.error("Error fetching posts:", error);
            setIsFetching(false);
        }
    };

    useEffect(() => {
        if (isInitialLoading) {
            loadPosts(); // Trigger loading posts initially
        }

        // Initialize the IntersectionObserver
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    loadPosts(); // Trigger loading more posts
                }
            },
            { threshold: 1.0 }
        );

        if (loadMoreRef.current) observer.observe(loadMoreRef.current);

        return () => {
            if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
        };
    }, [token, photos ]);

    const getBlocks = () => {
        const blocks = [];
        for (let i = 0; i < photos.length; i += 5) {
            const blockPhotos = photos.slice(i, i + 5);
            blocks.push(blockPhotos);
        }
        return blocks;
    };

    // Skeleton
    if (isInitialLoading) return (<div className="h-full m-2">
        {new Array(3).fill(0).map((_, ind) => <div key={ind}
                className="grid grid-cols-3 grid-flow-col gap-2 mb-2 animate-pulse-short">
            {new Array(5).fill(0).map((_, i) => (
                <div key={i} className={`bg-gray ${(ind % 2 === 0 && i === 0) ||
                (ind % 2 !== 0 && i === 4)
                    ? "row-span-2"
                    : "lgg:h-[316px] lg:h-[280px] md:h-[200px] aspect-square"} cursor-pointer`}>
                </div>
            ))}
            </div>
        )}
    </div>);

    return (
        <div className="flex flex-col md:mx-auto md:my-20 m-2 gap-2 lgg:max-w-[989px] lg:max-w-[820px] md:max-w-[640px]">
            {getBlocks().map((block: Post[], blockIndex: number) => (
                <div
                    key={blockIndex}
                    className="grid grid-cols-3 grid-flow-col gap-2"
                >
                    {block.map((post: Post, postIndex: number) => (
                        <Link
                            to={`/post/${post._id}`}
                            key={post._id}
                            className={`
                                ${(blockIndex % 2 === 0 && postIndex === 0) ||
                            (blockIndex % 2 !== 0 && postIndex === 4)
                                ? "row-span-2"
                                : "lgg:h-[316px] lg:h-[280px] md:h-[200px] aspect-square"} cursor-pointer
                            `}
                        >
                            <img
                                src={post.photo}
                                alt="Photo"
                                className="w-full h-full object-cover"
                            />
                        </Link>
                    ))}
                </div>
            ))}
            {/* Load more trigger */}
            <div ref={loadMoreRef} className="load-more-trigger h-2"></div>
        </div>
    );
};