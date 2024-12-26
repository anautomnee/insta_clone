type CommentAuthor = {
    _id: string;
    profile_image: string;
    username: string;
}

export type Comment = {
    _id: string;
    author: CommentAuthor;
    content: string;
    postId: string;
    createdAt: Date;
    like_count: number;
    likes: string[];
}

export type Like = {
    user: string,
    post?: string,
    comment?: string
}

export type Post = {
    _id: string;
    author: string;
    photo: string;
    content: string;
    createdAt: Date | null;
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