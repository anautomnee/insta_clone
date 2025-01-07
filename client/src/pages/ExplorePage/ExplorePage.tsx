import { useEffect, useState } from "react";
import {getRandomPosts} from "../../uitls/apiCalls.ts";
import {Post} from "../../store/types/instanceTypes.ts";
import {Link} from "react-router";
export const ExplorePage = () => {
        const [photos, setPhotos] = useState<Post[]>([]);
        const token = localStorage.getItem("userToken");

        useEffect(() => {
            const fetch10RandomPosts = async () => {
                if (!token) return;
                const result = await getRandomPosts(token);
                setPhotos(result);
            };
            fetch10RandomPosts();
        }, []);

        const getBlocks = () => {
            const blocks = [];
            for (let i = 0; i < photos.length; i += 5) {
                const blockPhotos = photos.slice(i, i + 5);
                blocks.push(blockPhotos);
            }
            return blocks;
        };

        return (
            <div className="flex flex-col mx-auto my-20 gap-2 max-w-[989px]">
                {getBlocks().map((block: Post[], blockIndex: number) => (
                    <div
                        key={blockIndex}
                        className="grid grid-cols-3 grid-flow-col gap-2"
                    >
                        {block.map((post: Post, postIndex: number) => (<Link to={`/profile/${post.author.username}/post/${post._id}`} key={post._id}
                            className={`
                                ${(blockIndex % 2 === 0 && postIndex === 0) ||
                                (blockIndex % 2 !== 0 && postIndex === 4)
                                    ? "row-span-2"
                                    : "h-[316px]"} cursor-pointer
                            `}>
                            <img src={post.photo}
                                 alt="Photo"
                                 className="w-full h-full object-cover"/>
                        </Link>))}
                    </div>

                ))}
            </div>
        );
    };