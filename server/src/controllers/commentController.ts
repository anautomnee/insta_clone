import {Request, Response} from "express";
import Post from "../db/models/Post.ts";
import Comment from "../db/models/Comment.ts";
import Like from "../db/models/Like.ts";

export const addCommentToPost = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params;
        if (!postId) {
            res.status(400).send('Id must be provided');
            return;
        }
        const post = await Post.findById(postId);
        if (!post) {
            res.status(404).send('Post now found');
            return;
        }
        const { content } = req.body;
        if (!content) {
            res.status(400).send('Content is required');
            return;
        }
        if (!req.user) {
            res.status(401).send('User is not authorized');
            return;
        }
        const newComment = await Comment.create({
            post: postId,
            author: req.user.id,
            content: content
        });
        post.comments.push(newComment._id);
        await newComment.save();
        await post.save();
        const populatedComment = await newComment.populate({
            path: 'author',
            select: 'profile_image username',
        });
        res.status(201).send(populatedComment);
    } catch (error) {
        console.error('Error uploading comment: ', error);
        res.status(500).send('Error uploading comment');
    }
};

export const likeComment = async (req: Request, res: Response) => {
    try {
        const { commentId } = req.params;
        if (!commentId) {
            res.status(400).send('Id must be provided');
            return;
        }
        const comment = await Comment.findById(commentId);
        if (!comment) {
            res.status(404).send('Post now found');
            return;
        }
        if (!req.user) {
            res.status(401).send('User is not authorized');
            return;
        }
        const newLike = await Like.create({
            user: req.user.id,
            comment: commentId
        });
        await newLike.save();
        comment.likes.push(newLike._id);
        await comment.save();
        res.status(201).send('Like for comment created successfully');
    } catch (error) {
        console.error('Error adding like to a comment: ', error);
        res.status(500).send('Error adding like to a comment');
    }
};