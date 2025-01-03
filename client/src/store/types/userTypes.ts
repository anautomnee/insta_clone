import {User} from "./instanceTypes.ts";

export type fetchUserData = {
    username: string,
    token: string,
}

export interface UserState extends User {
    status: string,
    error: string | null,
}

export type EditProfileData = {
    profile_image: FileList | null,
    username: string,
    new_username: string,
    website: string,
    bio: string,
    token: string,
}