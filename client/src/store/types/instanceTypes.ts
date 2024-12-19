export type Comment = {
    author: string;
    content: string;
    postId: string;
    created_at: Date;
    like_count: number;
    likes: string[];
}

export type Post = {
    _id: string;
    author: string;
    photo: string;
    content: string;
    createdAt: Date;
    like_count: number;
    likes: string[];
    comments: string[];
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