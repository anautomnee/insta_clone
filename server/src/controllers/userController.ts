import User from "../db/models/User";
import {Request, Response} from "express";
import mongoose from "mongoose";

export const getUserByUsername = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        const user = await User.find({username}).select('-password')
            .populate('followings').populate('followers').populate('posts');
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
        const { id } = req.params;

        // Check if user exists
        const user = await User.findById(id).select('-password');
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        const {username, bio} = req.body;
        if(username) user.username = username;
        if(bio) user.bio = bio;

        if (req.file) {
            const base64Image = req.file.buffer.toString('base64');
            user.profile_image = `data:image/${req.file.mimetype};base64,${base64Image}`;
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
        res.status(201).send('Follower added successfully.');
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
        res.status(201).send('Follower deleted successfully.');
    } catch (error) {
        console.error('Error deleting a following: ', error);
        res.status(500).send('Error deleting a following');
    }
};