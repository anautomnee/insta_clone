import User, {UserType} from "../db/models/User";
import Post from "../db/models/Post";
import { Request, Response } from 'express';
import multer from "multer";
import Like from "../db/models/Like.ts";
import mongoose from "mongoose";
import Notification from "../db/models/Notification.ts";
import {MulterRequest} from "../middlewares/uploadImage.ts";
import Photo from "../db/models/Photo.ts";

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
        if (req.files && user) {
            const base64EncodedImages: string[] = (req as MulterRequest).files.map((file) => {
                // Properly encode each file as a Base64 string
                return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
            });

            // Save each image to the `Photo` collection
            const photoDocuments = await Promise.all(
                base64EncodedImages.map(async (base64Image) => {
                    const photo = new Photo({
                        string64: base64Image,
                        post: null, // You can assign the post ID after creating the post
                    });
                    await photo.save();
                    return photo._id; // Collect the IDs for the post
                })
            );

            // Create the post with photo IDs
            const post = await Post.create({
                photos: photoDocuments, // Link the photo ObjectIds
                content,
                author: user._id,
            });

            // Update the `post` field in the `Photo` documents
            await Promise.all(
                photoDocuments.map(async (photoId) => {
                    await Photo.findByIdAndUpdate(photoId, { post: post._id });
                })
            );

            // Add the post to the user's list
            user.posts.push(post._id);
            await user.save();

            res.status(201).send(post);
        } else {
            res.status(400).send("No files uploaded or user not found");
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
        const post= await Post.findById(postId).populate({
            path: 'author', // Populate the author field
            select: 'profile_image username followers', // Include only photo and followers fields
        }).populate('likes')
            .populate({
            path: 'comments',
                populate: [
                    {
                        path: 'author',
                        select: 'profile_image username',
                    },
                    {
                        path: 'likes',
                        select: 'user',
                    }
                ]
        }).populate('photos', 'string64');
        res.status(200).send(post);
    } catch (error) {
        console.error('Error getting post by id: ', error);
        res.status(500).send('Error getting post by id');
    }
};

export const getRandomPosts = async (req: Request, res: Response) => {
    try {
        const {count} = req.query;
        const countNumber = Number(count);
        const posts = await Post.aggregate().sample(countNumber);
        const populatedPosts = await Post.populate(posts, [{ path: 'author', select: 'username' },
            { path: 'photos', select: 'string64' }]);

        res.status(200).send(populatedPosts);
    } catch (error) {
        console.error('Error getting posts: ', error);
        res.status(500).send('Error getting posts');
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
        const receiver = await User.findById(post.author);
        if (!receiver) {
            res.status(404).send('User is not found');
            return;
        }
        const newLike = await Like.create({
            user: req.user.id,
            post: postId
        });
        await newLike.save();
        const newNotification = await Notification.create({
            user: post.author,
            actionMaker: req.user.id,
            post: postId,
            type: 'liked your post'
        });
        post.likes.push(newLike._id);
        post.like_count += 1;
        await post.save();
        receiver.notifications.push(newNotification._id);
        await receiver.save();
        res.status(201).send('Like for post created successfully');
    } catch (error) {
        console.error('Error adding like to a post: ', error);
        res.status(500).send('Error adding like to a post');
    }
};

export const unLikePost = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId);
        if(!post || !req.user) {
            res.status(404).send('Post or user not found');
            return;
        }

        const like = await Like.findOne({ user: req.user.id, post: post._id });
        if (!like) {
            res.status(404).send('Like not found');
            return;
        }

        await Like.deleteOne({ _id: like._id });

        post.likes = post.likes.filter((likeId: mongoose.Types.ObjectId) => likeId.toString() !== like._id.toString());
        post.like_count -= 1;
        await post.save();
        res.status(200).send('Like deleted successfully');
    } catch (error) {
        console.error('Error unliking a post: ', error);
        res.status(500).send('Error unliking a post');
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        const post = (req as any).post;
        if(!post || !req.user) return;

        await Post.deleteOne({ _id: post._id });
        res.status(200).send(post);

    } catch (error) {
        console.error('Error deleting a post: ', error);
        res.status(500).send('Error deleting a post');
    }
};

export const updatePost = async (req: Request, res: Response) => {
    try {
        const post = (req as any).post;
        if(!post || !req.user) return;

        const {content} = req.body;
        if (!content) {
            res.status(401).send('Content be provided');
        }
        post.content = content;
        post.save();
        res.status(200).send(post);
    } catch (error) {
        console.error('Error updating a post: ', error);
        res.status(500).send('Error updating a post');
    }
};

export const getFollowedPosts = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            res.status(404).send('User is not authorized');
            return;
        }
        const userId = req.user.id; // Assume this is set by authentication middleware
        const page = parseInt(req.query.page as string) || 1;
        const limit = 10;

        // Find the current user's following list
        const user: UserType = await User.findById(userId).select("followings");
        if (!user) {
            res.status(404).send("User not found");
            return
        }

        // Fetch posts from followed users
        const posts = await Post.find({ author: { $in: user.followings } })
            .sort({ createdAt: -1 }) // Sort by newest first
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("author", "username profile_image")
            .populate('likes', 'user')
            .populate('photos', 'string64');

        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).send("Server error");
    }
};