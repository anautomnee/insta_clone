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
    likes: LikesFields[];
}

export type LikesFields = {
    _id: string;
    user: string;
}

export type Like = {
    user: string,
    post?: string,
    comment?: string
}

export type Post = {
    _id: string;
    author: CommentAuthor;
    photo: string;
    content: string;
    createdAt: Date | null;
    like_count: number;
    likes: LikesFields[];
    comments: Comment[];
}

export type User = {
    _id: string,
    username: string,
    email: string,
    full_name: string,
    profile_image: string,
    bio: string,
    posts: Post[] | [],
    followers: string[],
    followings: string[],
}