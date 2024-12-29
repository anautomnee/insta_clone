import {User} from "./instanceTypes.ts";

export type fetchUserData = {
    username: string,
    token: string,
}

export interface UserState extends User {
    status: string,
    error: string | null,
}

export type deletePostData = {
    postId: string;
    token: string;
}