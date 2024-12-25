import User from "../db/models/User";
import Post from "../db/models/Post";
import { Request, Response } from 'express';
import multer from "multer";
import Like from "../db/models/Like.ts";

export const createPost = async (req: Request, res: Response) => {
    try {
        const { content } = req.body;
        if (!content) {
            res.status(400).send('Photo and content are required');
            return;
        }
        if (!req.user) {
            res.status(401).send('User not found');
            return;
        }
        const user = await User.findById(req.user.id);
        if (req.file && user) {
            const base64Image = req.file.buffer.toString('base64');
            const base64EncodedImage = `data:image/${req.file.mimetype};base64,${base64Image}`;

            const post = await Post.create({
                photo: base64EncodedImage,
                content,
                author: user._id
            });
            await user.posts.push(post._id);
            await user.save();
            res.status(201).send('Post created successfully');
        }else {
            res.status(500).send('Photo error occurred');
            return;
        }
    } catch (error) {
        console.error('Error creating post: ', error);
        // Catch specific errors like Multer errors
        if (error instanceof multer.MulterError) {
            res.status(400).send(error.message);  // Send Multer's error message
        } else {
            res.status(500).send('Error creating post');
        }
    }
};

export const getPostById = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params;
        if (!postId) {
            res.status(404).send('Id must be provided');
            return;
        }
        // TO DO populate COMMENTS and LIKES
        const post= await Post.findById(postId).populate({
            path: 'author', // Populate the author field
            select: 'profile_image username followers', // Include only photo and followers fields
        });
        res.status(200).send(post);
    } catch (error) {
        console.error('Error getting post by id: ', error);
        res.status(500).send('Error getting post by id');
    }
};

export const likePost = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params;
        if (!postId) {
            res.status(400).send('Id must be provided');
            return;
        }
        const post = await Post.findById(postId);
        if (!post) {
            res.status(404).send('Post not found');
            return;
        }
        if (!req.user) {
            res.status(401).send('User is not authorized');
            return;
        }
        const newLike = await Like.create({
            user: req.user.id,
            post: postId
        });
        newLike.save();
        post.likes.push(newLike._id);
        post.save();
        res.status(201).send('Like for post created successfully');
    } catch (error) {
        console.error('Error adding like to a post: ', error);
        res.status(500).send('Error adding like to a post');
    }
};