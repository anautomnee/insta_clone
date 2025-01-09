import {useEffect, useRef, useState} from "react";
import { getRandomPosts} from "../../uitls/apiCalls.ts";
import {Post} from "../../store/types/instanceTypes.ts";
import {Link} from "react-router";

export const ExplorePage = () => {
    const [photos, setPhotos] = useState<Post[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const token = localStorage.getItem("userToken");

    const loadPosts = async (): Promise<void> => {
        try {
            if (!token || isFetching) return; // Prevent redundant fetches
            setIsFetching(true); // Set fetching state to true
            const fetchCount = window.innerHeight > window.innerWidth && photos.length === 0 ? 20 : 10;
            const result: Post[] = await getRandomPosts(token, fetchCount);

            // Update photos state and remove duplicates
            setPhotos((prevPosts) => [...prevPosts, ...result]);

            setIsFetching(false); // Reset fetching state
        } catch (error) {
            console.error("Error fetching posts:", error);
            setIsFetching(false); // Reset fetching state on error
        }
    };

    useEffect(() => {
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

    return (
        <div className="flex flex-col md:mx-auto md:my-20 my-2 mx-2 gap-2 lgg:max-w-[989px] lg:max-w-[820px] md:max-w-[640px]">
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