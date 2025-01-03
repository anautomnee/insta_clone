export type CondensedUser = {
    _id: string;
    profile_image: string;
    username: string;
}

export type CondensedPost = {
    _id: string;
    photo: string;
}

export type Message = {
    _id: string;
    content: string;
    author: CondensedUser;
    receiver: CondensedUser;
}

export type Notification = {
    _id: string,
    user: string,
    actionMaker: CondensedUser,
    post?: CondensedPost,
    comment?: { post: CondensedPost },
    createdAt: string,
    type: "liked your post" | "liked your comment" | "commented on your post" | "started following you"
}

export type Comment = {
    _id: string;
    author: CondensedUser;
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
    author: CondensedUser;
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
    website?: string,
    posts: Post[],
    notifications: Notification[],
    followers: CondensedUser[],
    followings: CondensedUser[],
}