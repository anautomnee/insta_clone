import {ChangeEvent, Dispatch, MouseEvent, SetStateAction, useState} from "react";
import {Link} from "react-router";
import upload from '../../assets/upload.png';
import arrow_back from '../../assets/arrow_back.svg';
import smiley from '../../assets/smiley.png';
import {SubmitHandler, useForm} from "react-hook-form";
import Picker, {EmojiClickData} from "emoji-picker-react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {createPost} from "../../store/actionCreators/postActionCreators.ts";
import {addPost} from "../../store/slices/userSlice.ts";
import {PhotoCarousel} from "../PhotoCarousel/PhotoCarousel.tsx";

interface CreatePostProps {
    userId: string | null;
    profileImage: string;
    username: string;
    setIsCreatePostOpen: Dispatch<SetStateAction<boolean>>;
}

type CreatePostFormInputs = {
    photos: FileList;
    content: string
};

export type PreviewType = {
    url: string;
    width: number;
    height: number;
}

export const CreatePost = ({ userId, username, profileImage, setIsCreatePostOpen }: CreatePostProps) => {
    const [previews, setPreviews] = useState<PreviewType[]>([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [creating, setCreating] = useState<boolean>(false);
    console.log(previews)

    const { status, error } = useSelector((state: RootState) => state.post);

    const dispatch = useDispatch<AppDispatch>();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
        reset,
    } = useForm<CreatePostFormInputs>({mode: "onChange"});


    const currentContent = watch("content") || ""; // Get current content value
    // Handle emoji click
    const onEmojiClick = (emojiData: EmojiClickData) => {
        const newContent = currentContent + emojiData.emoji; // Append emoji to content
        setValue("content", newContent); // Update content using setValue
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files) {
            const fileArray = Array.from(files);
            const previewPromises = fileArray.map((file) => {
                return new Promise<{ url: string; width: number; height: number }>((resolve) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);

                    reader.onload = () => {
                        const img = new Image();
                        img.src = reader.result as string;

                        img.onload = () => {
                            resolve({
                                url: reader.result as string,
                                width: img.width,
                                height: img.height,
                            });
                        };
                    };
                });
            });

            Promise.all(previewPromises).then((previews) => {
                console.log(previews); // Array of objects with url, width, and height
                setPreviews(previews); // Update previews state with image data
            });
        }
    };


    const closeCreatePost = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsCreatePostOpen(false);
        reset();
        setPreviews([]);
        setValue("content", "");
    };

    const onSubmit: SubmitHandler<CreatePostFormInputs> = async (data: CreatePostFormInputs) => {
        if (data) {
            console.log(data);
            setCreating(true);
            try {
                const result = await dispatch(createPost({ photos: data.photos, content: data.content })).unwrap();
                if (result && userId) {
                    dispatch(addPost(result));
                    setIsCreatePostOpen(false); // Hide the div
                    reset(); // Reset the form fields
                    setPreviews([]); // Clear the image preview
                    setValue("content", ""); // Reset content value
                    setCreating(false);
                }
            } catch (error) {
                console.error('Unexpected error:', error);
                // Optionally, show a message to the user if an unexpected error occurs
            }
        }
    };
    const photos = watch("photos");
    const content = watch("content");

    return (
        <div
            className="absolute z-20 left-0 -top-0 md:-top-7 h-[calc(100vh-81px)] md:h-screen w-screen
            md:w-[calc(100vw-58px)] lgg:w-[calc(100vw-244px)] md:left-[60px] lgg:left-[220px]"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}
            onClick={closeCreatePost}
        >
            <div className="bg-white opacity-100 mt-8 md:mt-20 mx-auto rounded-xl
            xl:w-[913px] lg:w-[800px] md:w-[510px] w-[90vw]"
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
                    <div className="relative">
                        {creating &&
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                                 fill="#0095F6" className="absolute -left-8 animate-spin">
                                <path
                                    d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/>
                            </svg>}
                        <input
                            type="submit"
                            disabled={currentContent.length === 0 || !photos?.length}
                            className={currentContent.length === 0 || !photos?.length ? "text-gray" : "text-blue cursor-pointer"}
                            value="Share"
                        />
                    </div>
                    {errors.photos && <p className="pl-3.5 pt-2 text-xs text-error">Photo should be less than 5MB</p>}
                    {errors.content &&
                        <p className="pl-3.5 pt-2 text-xs text-error">The comment should be less than 2200
                            characters</p>}

                </form>
                <div className="flex flex-col md:flex-row">
                    <div className="relative flex items-center justify-center
                    h-[320px]
                    md:w-[280px] md:h-[280px]
                    lg:w-[420px] lg:h-[420px]
                    xl:w-[520px] xl:h-[520px]
                    bg-lightgray">
                        {previews.length > 0 ? <PhotoCarousel
                            croppedStyle={true}
                            photos={previews.map(preview => preview.url || "")}
                            previews={previews}/> : (
                            <img src={upload} alt="upload" />
                        )}
                        <input type="file"
                               {...register("photos", { required: "Photos are required" })}
                               className="cursor-pointer opacity-0 absolute top-0 left-0 bottom-0 right-0 w-full h-full"
                               onChange={handleFileChange}
                               multiple />

                    </div>
                    <div className="flex flex-col px-4 py-6 md:w-[42%]">
                        <Link
                            to={`profile/${userId}`}
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={profileImage}
                                    alt="Profile image"
                                    className="w-6 h-6 rounded-[50%] border border-gray"
                                />
                                <p className="font-semibold">{username}</p>
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
