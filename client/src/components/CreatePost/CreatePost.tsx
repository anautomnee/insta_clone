import {ChangeEvent, MouseEvent, RefObject, useState} from "react";
import {Link} from "react-router";
import {UserInfoAuthType} from "../../store/types/authTypes.ts";
import upload from '../../assets/upload.png';
import arrow_back from '../../assets/arrow_back.svg';
import smiley from '../../assets/smiley.png';
import {SubmitHandler, useForm} from "react-hook-form";
import Picker, {EmojiClickData} from "emoji-picker-react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {createPost} from "../../store/actionCreators/postActionCreators.ts";

interface CreatePostProps {
    divRef: RefObject<HTMLDivElement>;
    userInfo: UserInfoAuthType | null;
    token: string | null;
}

type CreatePostFormInputs = {
    photo: FileList;
    content: string
};

export const CreatePost = ({ divRef, userInfo, token }: CreatePostProps) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const { status, error } = useSelector((state: RootState) => state.post);

    const dispatch = useDispatch<AppDispatch>();

    // Handle emoji click
    const onEmojiClick = (emojiData: EmojiClickData) => {
        const currentContent = watch("content") || ""; // Get current content value
        const newContent = currentContent + emojiData.emoji; // Append emoji to content
        setValue("content", newContent); // Update content using setValue
    };

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { isValid },
    } = useForm<CreatePostFormInputs>({mode: "onChange"});


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];  // Get the first file (if any)

        if (file) {
            // Generate a preview for the file (if it's an image)
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);  // Set the preview URL
            };
            reader.readAsDataURL(file);  // Read the file as a Data URL (base64)
        }
    };

    const closeCreatePost = (e: MouseEvent<HTMLDivElement>) => {
        if (divRef.current) {
            e.stopPropagation();
            divRef.current.hidden = true;
            reset();
            setPreview(null);
            setValue("content", "");
        }
    };

    const onSubmit: SubmitHandler<CreatePostFormInputs> = async (data: CreatePostFormInputs) => {
        if (data && token && divRef.current) {
            try {
                const result = await dispatch(createPost({ photo: data.photo, content: data.content, token }));
                console.log(result);
                if (result.type !== "post/createPost/rejected") {
                    divRef.current.hidden = true; // Hide the div
                    reset(); // Reset the form fields
                    setPreview(null); // Clear the image preview
                    setValue("content", ""); // Reset content value
                }
            } catch (error) {
                console.error('Unexpected error:', error);
                // Optionally, show a message to the user if an unexpected error occurs
            }
        }
    };
    const photo = watch("photo");
    const content = watch("content");

    return (
        <div
            className="absolute h-screen top-0 w-screen md:w-[calc(100vw-244px)] left-0 md:left-[244px]"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}
            onClick={closeCreatePost}
        >
            <div className="bg-white opacity-100 mt-36 mx-auto rounded-xl xl:w-[913px] lg:w-[720px] md:w-[510px] w-[90vw]"
            onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                {status === 'FAILED' && error && <div className="p-4 text-error text-center">Image should be less than 5MB and svg/jpg/png</div>}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex justify-between p-4 border-b border-b-gray">
                    <img
                        src={arrow_back}
                        alt="Back"
                        className="cursor-pointer"
                        onClick={closeCreatePost}/>
                    <p className="font-semibold">Create new post</p>
                    <input type="submit"
                           disabled={!isValid || !photo?.length}
                           className="text-blue" value="Share"/>
                </form>
                <div className="flex flex-col md:flex-row">
                    <div className="relative flex items-center justify-center
                    h-[75vw]
                    md:w-[280px] md:h-[280px]
                    lg:w-[420px] lg:h-[420px]
                    xl:w-[520px] xl:h-[520px]
                    bg-lightgray">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Preview"
                                className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover"
                            />
                        ) : (
                            <img src={upload} alt="upload" />
                        )}
                        <input type="file"
                               {...register("photo", { required: "Photo is required" })}
                               className="cursor-pointer opacity-0 absolute top-0 left-0 bottom-0 right-0 w-full h-full"
                               onChange={handleFileChange}/>

                    </div>
                    <div className="flex flex-col px-4 py-6 md:w-[42%]">
                        <Link
                            to={`profile/${userInfo?.id}`}
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={userInfo?.profile_image}
                                    alt="Profile image"
                                    className="w-6 h-6 rounded-[50%] border border-gray"
                                />
                                <p className="font-semibold">Profile</p>
                            </div>
                        </Link>
                        <textarea
                            {...register("content", {required: "Content is required", maxLength: 2200})}
                            className="resize-none w-full h-32 lg:h-52 mt-4 p-3"
                        ></textarea>
                        <p className="text-gray self-end">{content?.length}/2 200</p>
                        <div className="relative border-b border-b-gray pb-3 mt-6">
                            <img src={smiley}
                                 alt="Emoji"
                                 className="cursor-pointer"
                                 onClick={() => setShowEmojiPicker(!showEmojiPicker)}/>
                            {showEmojiPicker && (
                                <div className="absolute bottom-28 md:bottom-0 z-10
                                -right-50 md:right-60 lg:right-80 xl:right-96">
                                    <Picker onEmojiClick={onEmojiClick} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
