import React, {Dispatch, MouseEvent} from "react";
import like from "../assets/reactions/like.svg";
import {likeComment, likePost, unLikeComment, unLikePost} from "./apiCalls.ts";
import liked from "../assets/reactions/liked.svg";
import {Post} from "../store/types/instanceTypes.ts";

const token = localStorage.getItem("userToken");

export const onLikeComment = async (e: MouseEvent<HTMLImageElement>, commentId: string, post: Post | null, setPost: Dispatch<React.SetStateAction<Post | null>>) => {
    const target = e.target as HTMLImageElement;

    if (!token || !target) {
        return;
    }

    if (target.src === like) {
        await likeComment(token, commentId);

        // Update the UI immediately after liking the comment
        if (!post) return;
        const updatedPost = { ...post };
        const updatedComment = updatedPost?.comments.find((c) => c._id === commentId);
        if (updatedComment) {
            // Create a new comment object with the updated like_count
            const modifiedComment = { ...updatedComment, like_count: updatedComment.like_count + 1 };

            // Replace the old comment with the modified one
            updatedPost.comments = updatedPost.comments.map((comment) =>
                comment._id === commentId ? modifiedComment : comment
            );
        }
        setPost(updatedPost);

        target.src = liked;
    } else {
        await unLikeComment(token, commentId);

        // Update the UI immediately after liking the comment
        if (!post) return;
        const updatedPost = { ...post };
        const updatedComment = updatedPost?.comments.find((c) => c._id === commentId);
        if (updatedComment) {
            // Create a new comment object with the updated like_count
            const modifiedComment = { ...updatedComment, like_count: updatedComment.like_count - 1 };

            // Replace the old comment with the modified one
            updatedPost.comments = updatedPost.comments.map((comment) =>
                comment._id === commentId ? modifiedComment : comment
            );
        }
        setPost(updatedPost);

        target.src = like;
    }
};

export const onLikePost = async (e: MouseEvent<HTMLImageElement>, postId: string, post: Post | null, setPost: Dispatch<React.SetStateAction<Post | null>>) => {
    const target = e.target as HTMLImageElement;
    if (!token) {
        return;
    }

    if (target.src === like) {
        await likePost(token, postId);

        // Update the UI immediately after liking the comment
        if (post) {
            setPost({ ...post, like_count: post.like_count + 1 });
        }

        target.src = liked;
    } else {
        await unLikePost(token, postId);

        // Update the UI immediately after liking the comment
        if (post) {
            setPost({ ...post, like_count: post.like_count - 1 });
        }

        target.src = like;
    }
};

export const onLikePostFromHomepage = async (e: MouseEvent<HTMLImageElement>, postId: string, setPosts: Dispatch<React.SetStateAction<Post[]>>) => {
    const target = e.target as HTMLImageElement;
    if (!token) {
        return;
    }

    if (target.src === like) {
        await likePost(token, postId);

        // Update the UI immediately after liking the comment
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post._id === postId
                    ? { ...post, like_count: post.like_count + 1 }
                    : post
            )
        );


        target.src = liked;
    } else {
        await unLikePost(token, postId);

        // Update the UI immediately after liking the comment
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post._id === postId
                    ? { ...post, like_count: post.like_count - 1 }
                    : post
            )
        );

        target.src = like;
    }
};