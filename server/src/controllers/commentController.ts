import {Request, Response} from "express";
import Post from "../db/models/Post.ts";
import Comment from "../db/models/Comment.ts";
import comment from "../db/models/Comment.ts";

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
        newComment.save();
        post.save();
        res.status(201).send('Comment created successfully');
    } catch (error) {
        console.error('Error uploading comment: ', error);
        res.status(500).send('Error uploading comment');
    }
};