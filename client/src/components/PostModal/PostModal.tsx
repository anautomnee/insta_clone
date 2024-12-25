import {Dispatch, MouseEvent, RefObject, SetStateAction, useState} from "react";
import {PostState} from "../../store/types/postTypes.ts";
import {Link} from "react-router";
import {formatDate} from "../../uitls/utils.ts";
import smiley from "../../assets/smiley.png";
import Picker, {EmojiClickData} from "emoji-picker-react";
import {SubmitHandler, useForm} from "react-hook-form";

type PostModalProps = {
    post: PostState | null;
    currentPostRef: RefObject<HTMLDivElement>;
    setCurrentPost: Dispatch<SetStateAction<PostState | null>>;
}

export const PostModal = ({post, currentPostRef, setCurrentPost}: PostModalProps) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [commentError, setCommentError] = useState<string | null>(null);
    console.log(post?._id)

    type CommentFormInputs = {
        content: string
    };
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<CommentFormInputs>({mode: "onChange"});

    // Handle emoji click
    const onEmojiClick = (emojiData: EmojiClickData) => {
        const currentContent = watch("content") || ""; // Get current content value
        const newContent = currentContent + emojiData.emoji; // Append emoji to content
        setValue("content", newContent); // Update content using setValue
    };

    const closePostModal = (e: MouseEvent<HTMLDivElement> | MouseEvent<HTMLAnchorElement>) => {
        if (currentPostRef.current) {
            e.stopPropagation();
            setCurrentPost(null);
            currentPostRef.current.hidden = true;
        }
    };

    const onComment: SubmitHandler<CommentFormInputs> = async (data: CommentFormInputs) => {
        try {
            console.log("onComment", data);
            // API CALL
            reset();
        } catch (e) {
            console.error('Could not upload comment', e);
            setCommentError('Could not upload comment')
        }
    };

    return (<div
        className="fixed h-[calc(100vh-81px)] md:min-h-screen top-0 w-screen
            md:w-[calc(100vw-60px)] lgg:w-[calc(100vw-244px)] left-0 md:left-[60px] lgg:left-[244px]"
        style={{backgroundColor: 'rgba(0, 0, 0, 0.65)'}}
        onClick={closePostModal}
    >
        <div className="relative flex flex-col md:grid bg-white opacity-100 md:mt-24 mx-auto rounded
            lgg:grid-cols-[577px_423px] lg:grid-cols-[484px_356px] md:grid-cols-[358px_262px]
            h-[74vh] md:h-fit mt-[8vh]
            lgg:min-w-[1000px] lg:w-[840px] md:w-[620px] w-[90vw]"
             onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                <div className="flex justify-center items-center
                 border-r border-gray lgg:w-[577px] lgg:h-[577px]
                 lg:w-[484px] lg:h-[484px] md:w-[358px] md:h-[358px]
                 w-full">
                    <img
                    src={post?.photo}
                    alt="Post"
                    className="w-full h-full object-contain"/>
                </div>
                <div className="pr-6 overflow-y-scroll pb-12 lgg:h-[577px]
                 lg:h-[484px] md:h-[358px]">
                    <div className="border-b border-b-gray">
                        <Link
                            to={`/profile/${post?.author?._id}`}
                            onClick={closePostModal}
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
                    </div>
                    <div className="flex gap-3 mx-3.5 my-3 text-xs">
                        <Link
                            to={`/profile/${post?.author?._id}`}
                            onClick={closePostModal}
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
                                    to={`/profile/${post?.author?._id}`}
                                    onClick={closePostModal}
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
                    <div className="absolute bottom-0">
                        <div className="border-t border-t-gray">
                            {errors.content && <p className="pl-3.5 pt-2 text-xs text-error">The comment should be less than 120 characters</p>}
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
                                            -right-50 md:right-60 lg:right-80 xl:right-96">
                                            <Picker onEmojiClick={onEmojiClick} />
                                        </div>
                                    )}
                                    <input {...register('content', { required: true, maxLength: 120 })}
                                        placeholder="Add comment"
                                    className="placeholder:text-xs py-2.5
                                     w-[54vw] sm:w-[62vw] md:w-36 lg:w-52 lgg:w-64 outline-0"/>
                                </div>
                                <button type="submit"
                                        className="text-blue text-xs font-semibold pr-6 lg:pr-10">Send</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};