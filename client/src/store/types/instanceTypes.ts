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
    password: string,
    posts: Post[],
    followers: string[],
    followings: string[],
}