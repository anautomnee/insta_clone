import { Request, Response } from "express";
import User, {UserType} from "../db/models/User.ts";
import Chat from "../db/models/Chat.ts";

export const getChatMessages = async (req: Request, res: Response) => {
    try {
        const {receiverUsername} = req.body;
        if (!receiverUsername || !req.user) {
            res.status(400).send('Receiver and sender must be provided');
            return;
        }
        const receiver: UserType | null = await User.findOne({username: receiverUsername});
        if (!receiver) {
            res.status(404).send('User is not found');
            return;
        }

        const chat = await Chat.findOne({
            $or: [
                { user1: req.user.id, user2: receiver._id },
                { user1: receiver._id, user2: req.user.id }
            ]
        }).populate({
            path: 'messages',
            select: 'content createdAt',
            populate: [{
                path: 'author',
                select: 'profile_image username'
            }]
        }).populate({
            path: 'user1',
            select: 'profile_image username'
        }).populate({
            path: 'user2',
            select: 'profile_image username'
        });

        if (!chat) {
            res.status(404).send('No chat found between these users');
            return;
        }
        res.status(200).send(chat);
    } catch (error) {
        console.error('Error getting chat: ', error);
        res.status(500).send('Error getting chat');
    }
}