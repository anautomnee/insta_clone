import {Link} from "react-router";
import more from "../../assets/more.svg";
import {formatDate, isLikedByUser} from "../../uitls/utils.ts";
import liked from "../../assets/reactions/liked.svg";
import like from "../../assets/reactions/like.svg";
import {onLikeComment, onLikePost} from "../../uitls/likeFunctions.ts";
import comment from "../../assets/reactions/comment.svg";
import smiley from "../../assets/smiley.png";
import Picker, {EmojiClickData} from "emoji-picker-react";
import {Post} from "../../store/types/instanceTypes.ts";
import {Dispatch, RefObject, SetStateAction, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {addComment} from "../../uitls/apiCalls.ts";

type PostMainProps = {
    post: Post | null;
    setPost: Dispatch<SetStateAction<Post | null>>;
    moreRef: RefObject<HTMLDivElement>;
}

export const PostMain = ({post, setPost, moreRef}: PostMainProps) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [commentError, setCommentError] = useState<string | null>(null);
    const userId = useSelector((state: RootState) => state.user._id);

    const token = localStorage.getItem("userToken");

    type CommentFormInputs = {
        content: string
    };
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        setFocus,
        formState: { errors },
    } = useForm<CommentFormInputs>({mode: "onChange"});


    // Handle emoji click
    const onEmojiClick = (emojiData: EmojiClickData) => {
        const currentContent = watch("content") || ""; // Get current content value
        const newContent = currentContent + emojiData.emoji; // Append emoji to content
        setValue("content", newContent); // Update content using setValue
    };

    const onComment: SubmitHandler<CommentFormInputs> = async (data: CommentFormInputs) => {
        try {
            if (post && token) {
                const newComment = await addComment(data.content, token, post?._id);
                if (newComment) {
                    setPost(prev => ({
                        ...prev!,
                        comments: [...(prev?.comments || []), newComment]
                    }));
                }
                reset();
            }
        } catch (e) {
            console.error('Could not upload comment', e);
            setCommentError('Could not upload comment')
        }
    };

    return (
        <div className="pr-6 overflow-y-scroll mb-32 lgg:h-[520px]
                 lg:h-[370px] md:h-[240px] xs::max-h-[240px] sm:max-h-[108px] md:max-h-full">
            <div className="hidden lg:flex justify-between border-b border-b-gray">
                <Link
                    to={`/profile/${post?.author?.username}`}
                >
                    <div className="flex items-center gap-3 mx-3.5 my-4 text-xs">
                        <img
                            src={post?.author?.profile_image}
                            alt="Profile image"
                            className="w-6 h-6 rounded-[50%] border border-gray"
                        />
                        <span className="font-semibold">{post?.author?.username}</span>
                    </div>
                </Link>
                <img
                    src={more}
                    alt="More"
                    onClick={() => {
                        if (moreRef.current) {
                            moreRef.current.hidden = false;
                        }
                    }}
                />
            </div>
            <div className="flex gap-3 mx-3.5 my-3 text-xs">
                <Link
                    to={`/profile/${post?.author?.username}`}
                >
                    <img
                        src={post?.author?.profile_image}
                        alt="Profile image"
                        className="min-w-6 h-6 rounded-[50%] border border-gray"
                    />
                </Link>
                <div className="flex-col">
                    <p>
                        <Link
                            to={`/profile/${post?.author?.username}`}
                        >
                            <span className="font-semibold">{post?.author?.username}</span>
                        </Link>
                        <span>   </span>
                        {post?.content}
                    </p>
                    {post?.createdAt && <p className="text-darkgray text-[11px] mt-2">
                        {formatDate(new Date(post?.createdAt))}</p>}
                </div>
            </div>
            <div className="flex flex-col mb-3.5 px-3.5 text-xs gap-5">
                {post?.comments && post?.comments.length > 0 && (
                    post?.comments.map((comment) => (
                        <div key={comment._id} className="flex justify-between">
                            <div className="flex justify-between gap-3">
                                <Link to={`/profile/${comment.author.username}`}>
                                    <img src={comment.author.profile_image}
                                         alt={comment.author.username}
                                         className="w-6 h-6 rounded-[50%] border border-gray"/>
                                </Link>
                                <div>
                                    <Link to={`/profile/${comment.author.username}`}>
                                        <p>{comment.author.username}</p>
                                    </Link>
                                    <p>{comment.content}</p>
                                    <div className="flex text-darkgray text-[11px]">
                                        {comment?.createdAt && <p className="mr-5">
                                            {formatDate(new Date(comment?.createdAt))}</p>}
                                        <p>Likes: {comment?.like_count}</p>
                                    </div>
                                </div>
                            </div>
                            <img src={userId && isLikedByUser(comment?.likes, userId) ? liked : like} alt={comment._id}
                                 className="w-2.5 h-2.5 cursor-pointer"
                                 onClick={(e) => onLikeComment(e, comment._id, post, setPost)}/>
                        </div>
                    ))
                )}
            </div>
            <div className="absolute bg-white bottom-0">
                <div className="pl-3.5 mb-3 mt-2">
                    <div className="flex gap-3 mb-2">
                        <img src={userId && post?.likes && isLikedByUser(post?.likes, userId) ? liked : like}
                             alt='like'
                             className="w-6 h-6 cursor-pointer"
                             onClick={(e) => post?._id && onLikePost(e, post._id, post, setPost)}/>
                        <img src={comment}
                             alt="comment"
                             className="cursor-pointer"
                             onClick={() => setFocus('content')}/>
                    </div>
                    <p className="text-xs font-semibold">{post?.like_count} likes</p>
                    {post?.createdAt && <p className="text-darkgray text-[11px] mt-2">
                        {formatDate(new Date(post?.createdAt))}</p>}
                </div>
                <div className="border-t border-t-gray">
                    {errors.content && <p className="pl-3.5 pt-2 text-xs text-error">The comment should be less than 120
                        characters</p>}
                    {commentError && <p className="pl-3.5 pt-2 text-xs text-error">{commentError}</p>}
                    <form className="flex items-center justify-between pl-3.5 bg-white
                            lgg:w-[423px] lg:w-[356px] md:w-[262px] w-[90vw]"
                          onSubmit={handleSubmit(onComment)}>
                        <div className="flex items-center gap-4">
                            <img src={smiley}
                                 alt="Emoji"
                                 className="w-6 h-6 cursor-pointer"
                                 onClick={() => setShowEmojiPicker(!showEmojiPicker)}/>
                            {showEmojiPicker && (
                                <div className="absolute bottom-28 md:bottom-0 z-10
                                            -right-0 sm:right-50 md:right-72 lg:right-16 xl:right-96">
                                    <Picker onEmojiClick={onEmojiClick}/>
                                </div>
                            )}
                            <input {...register('content', {required: true, maxLength: 120})}
                                   placeholder="Add comment"
                                   className="placeholder:text-xs py-2.5
                                     w-[54vw] sm:w-[62vw] md:w-36 lg:w-52 lgg:w-64 outline-0"/>
                        </div>
                        <button type="submit"
                                className="text-blue text-xs font-semibold pr-6 lg:pr-10">Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};