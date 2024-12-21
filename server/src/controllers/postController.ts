import User from "../db/models/User";
import Post from "../db/models/Post";
import { Request, Response } from 'express';
import multer from "multer";

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