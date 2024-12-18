import {Post} from "./instanceTypes.ts";

export type PostState = {
    status: string,
    error: string | null,
    posts: Post[],
}

export type CreatePost = {
    photo: FileList,
    content: string,
    token: string,
}