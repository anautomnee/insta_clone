import User from "../db/models/User";
import {Request, Response} from "express";
import mongoose from "mongoose";

export const getUserByUsername = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        const user = await User.find({username}).select('-password')
            .populate({
                path: 'followings',
                select: 'profile_image username _id',
            }).populate({
                path: 'followers',
                select: 'profile_image username _id',
            }).populate('posts');
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        res.status(200).send(user);
    } catch (error) {
        console.error('Error fetching a user: ', error);
        res.status(500).send('Error fetching a user');
    }
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        // Check if user exists
        const user = await User.findOne({username}).select('-password');
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        const { bio, website, new_username} = req.body;
        // Check if username already exists
        const usernameExists = await User.findOne({ username: new_username });
        if (usernameExists) {
            res.status(400).json({ message: 'Username already exists' });
            return;
        }
        if(new_username.length > 0 && new_username !== user.username && new_username.length <= 120) user.username = new_username;
        if(website.length > 0 && website !== user.username && website.length <= 120) user.website = website;
        if(bio.length > 0 && bio.length <= 150 && bio !== user.bio ) user.bio = bio;

        if (req.file) {
            const base64Image = req.file.buffer.toString('base64');
            if (user.profile_image !== base64Image) {
                user.profile_image = `data:image/${req.file.mimetype};base64,${base64Image}`;
            }
        }
        const updatedUser = await user.save();
        res.status(200).send(updatedUser);
    } catch (error) {
        console.error('Error updating a user profile: ', error);
        res.status(500).send('Error updating a user profile');
    }
};

export const followUser = async (req: Request, res: Response) => {
    try {
        const profile = (req as any).profile;
        const userProfile = (req as any).userProfile;
        const followed = (req as any).followed;

        if (followed) {
            res.status(404).send('Already followed');
            return;
        }

        profile.followers.push(userProfile._id);
        userProfile.followings.push(profile._id);
        profile.save();
        userProfile.save();
        res.status(201).send({
            _id: profile._id,
            profile_image: profile.profile_image,
            username: profile.username,
        });
    } catch (error) {
        console.error('Error following a user: ', error);
        res.status(500).send('Error following a user');
    }
};

export const unfollowUser = async (req: Request, res: Response) => {
    try {
        const profile = (req as any).profile;
        const userProfile = (req as any).userProfile;
        const followed = (req as any).followed;

        if (!followed) {
            res.status(404).send('Following not found');
            return;
        }

        profile.followers = profile.followers.filter((f: mongoose.Types.ObjectId) => !f._id.equals(userProfile._id));
        userProfile.followings = userProfile.followings.filter((f: mongoose.Types.ObjectId) => !f._id.equals(profile._id));
        profile.save();
        userProfile.save();
        res.status(200).send({
            _id: profile._id,
            profile_image: profile.profile_image,
            username: profile.username,
        });
    } catch (error) {
        console.error('Error deleting a following: ', error);
        res.status(500).send('Error deleting a following');
    }
};