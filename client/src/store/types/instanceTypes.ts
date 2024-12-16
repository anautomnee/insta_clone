export type Post = {
    id: number;
    title: string;
    content: string;
    author: string;
}

export type User = {
    id: string,
    username: string,
    email: string,
    fullName: string,
    profileImage: string,
    bio: string,
    posts: Post[] | [],
    followers: string[],
    followings: string[],
}

export type Comment = {
    author: string;
    content: string;
    postId: number;
    created_at: Date;
    like_count: number;
}