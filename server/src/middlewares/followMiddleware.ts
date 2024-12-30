import {Request, Response, NextFunction} from "express";
import User from "../db/models/User.ts";

export const ifFollowed = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params;
    if (!username || !req.user) {
        res.status(400).send('Username of follower and following is required');
        return;
    }

    const profile = await User.findOne({username});
    const user = await User.findById(req.user.id);
    if (!profile || !user) {
        res.status(404).send('User not found');
        return;
    }

    // Check if already followed
    (req as any).followed = profile.followers.includes(user._id);
    (req as any).userProfile = user;
    (req as any).profile = profile;
    next();
};