import {Comment, LikesFields} from "./instanceTypes.ts";

type PostUserFields = {
    _id: string;
    profile_image: string;
    username: string;
    followers: string[];
}

export type PostState = {
    status: string,
    error: string | null,
    _id: string,
    author: PostUserFields | null,
    photo: string,
    content: string,
    createdAt: Date | null,
    like_count: number,
    likes: LikesFields[],
    comments: Comment[],
}

export type CreatePost = {
    photo: FileList,
    content: string,
    token: string,
}

export type FetchPostParams = {
    id: string,
    token: string,
}