import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {useForm} from "react-hook-form";

export const EditProfilePage = () => {
    const user = useSelector((state: RootState) => state.user);

    type EditProfileInputs = {
        profile_image: string;
        username: string;
        website: string;
        about: string;
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<EditProfileInputs>();

    const bio = watch('about');

    return (
        <form className="flex flex-col ml-40 max-w-[610px]">
            <p className="font-semibold text-xl mb-11">Edit profile</p>
            <div className="flex justify-between items-center mb-8 p-4 bg-gray rounded-[20px]">
                <div className="flex gap-4">
                    <img src={user.profile_image}
                         alt={user.username}
                         className="w-14 h-14 rounded-[50%] border border-[#00000019]"/>
                    <input type="hidden" {...register('profile_image')}/>
                    <div>
                        <p className="font-semibold mb-2">{user.username}</p>
                        <p className="w-[265px] break-words line-clamp-2">{user.bio}</p>
                    </div>
                </div>
                <button className="text-white bg-blue h-fit rounded-lg px-4 py-2">New photo</button>
            </div>
            <p className="font-semibold mb-2">Username</p>
            <input {...register('username', {required: 'Username is required'})}
                className="border border-gray rounded-xl mb-5 h-10 px-4"/>
            <p className="font-semibold mb-2">Website</p>
            <input {...register('website')}
                   className="border border-gray rounded-xl mb-5 h-10 px-4"/>
            <p className="font-semibold mb-2">About</p>
            <div className="relative h-16 mb-16 w-full">
                <textarea {...register('about', {maxLength: 150})}
                    className="border border-gray rounded-xl h-16 w-full pl-4 pr-20 py-1 overflow-y-scroll resize-none"/>
                <p className="absolute bottom-2 right-3 text-darkgray text-xs">{bio?.length}/150</p>
            </div>
            <button className="bg-blue text-white py-2 w-[268px] rounded-lg text-sm">Save</button>
        </form>
    );
};