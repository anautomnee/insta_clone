import {Post} from "./instanceTypes.ts";

export interface PostState extends Post {
    status: string,
    error: string | null,
}

export type CreatePost = {
    photo: string,
    content: string,
    token: string,
}