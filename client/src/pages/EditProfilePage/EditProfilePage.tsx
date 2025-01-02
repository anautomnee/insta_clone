import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import { ChangeEvent, useEffect, useState, useRef } from "react";
import {editProfile} from "../../store/actionCreators/userActionCreators.ts";

export const EditProfilePage = () => {
    const [preview, setPreview] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<FileList | null>(null);
    const [username, setUsername] = useState<string>("");
    const [website, setWebsite] = useState<string>("");
    const [about, setAbout] = useState<string>("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const token = localStorage.getItem("userToken");

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setAbout(user.bio);
            if (user.website) {
                setWebsite(user.website);
            }
            setPreview(user.profile_image); // Set initial profile image preview
        }
    }, [user]);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (profileImage && profileImage[0].size > 5 * 1024 * 1024) {
            newErrors.profile_image = "File must be smaller than 5MB.";
        }

        if (username.length > 120) {
            newErrors.username = "Username should be less than 120 characters.";
        }

        if (website.length > 120) {
            newErrors.website = "Website should be less than 120 characters.";
        }

        if (about.length > 150) {
            newErrors.about = "Bio should be less than 150 characters.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            // Validate file size manually here
            if (file.size > 5 * 1024 * 1024) {
                alert("File must be smaller than 5MB");
                return;
            }

            // Generate a preview for the file (if it's an image)
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string); // Set the preview URL
            };
            reader.readAsDataURL(file); // Read the file as a Data URL (base64)

            // Set the selected file into state
            setProfileImage(e.target.files);
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            if (token) {
                 await dispatch(editProfile({
                    username: user.username,
                    new_username: username,
                    profile_image: profileImage,
                    website: website,
                    bio: about,
                    token: token
                }))
            }
        }
    };

    const handleAboutChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        if (text.length <= 150) {
            setAbout(text);
        }
    };

    return (
        <form className="flex flex-col ml-40 max-w-[610px]" onSubmit={onSubmit}>
            <p className="font-semibold text-xl mb-11">Edit profile</p>
            <div className="flex justify-between items-center mb-8 p-4 bg-gray rounded-[20px]">
                <div className="flex gap-4">
                    <img
                        src={preview || user.profile_image} // Use preview or fallback to existing user image
                        alt={user.username}
                        className="w-14 h-14 object-cover rounded-[50%] border border-[#00000019]"
                    />
                    <div>
                        <p className="font-semibold mb-2">{user.username}</p>
                        <p className="w-[265px] break-words line-clamp-2">{user.bio}</p>
                    </div>
                </div>
                <input
                    ref={fileInputRef}
                    id="fileInput"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
                <button
                    type="button"
                    onClick={handleButtonClick}
                    className="text-white bg-blue h-fit rounded-lg px-4 py-2 cursor-pointer"
                >
                    New photo
                </button>
            </div>
            {user.error && user.error.length > 0 && <p className="pt-2 text-xs text-error">{user.error}</p>}
            {errors.profile_image && (
                <p className="pt-2 text-xs text-error">{errors.profile_image}</p>
            )}
            <p className="font-semibold mb-2">Username</p>
            {errors.username && (
                <p className="pt-2 text-xs text-error">{errors.username}</p>
            )}
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-gray rounded-xl mb-5 h-10 px-4"
            />
            <p className="font-semibold mb-2">Website</p>
            {errors.website && (
                <p className="pt-2 text-xs text-error">{errors.website}</p>
            )}
            <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="border border-gray rounded-xl mb-5 h-10 px-4"
            />
            <p className="font-semibold mb-2">About</p>
            {errors.about && (
                <p className="pt-2 text-xs text-error">{errors.about}</p>
            )}
            <div className="relative h-16 mb-16 w-full">
        <textarea
            value={about}
            onChange={handleAboutChange}
            className="border border-gray rounded-xl h-16 w-full pl-4 pr-20 py-1 overflow-y-scroll resize-none"
        />
                <p className="absolute bottom-2 right-3 text-darkgray text-xs">{about.length}/150</p>
            </div>
            <button className="bg-blue text-white py-2 w-[268px] rounded-lg text-sm">Save</button>
        </form>
    );
};
