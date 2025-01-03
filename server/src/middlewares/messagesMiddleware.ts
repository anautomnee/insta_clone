import {Request, Response, NextFunction} from "express";
import User, {UserType} from "../db/models/User.ts";
import Chat from "../db/models/Chat.ts";

const messagesMiddleware = async (req: Request, res: Response, next: NextFunction) => {
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
        }).populate('messages');

        (req as any).authorId = req.user.id;
        (req as any).receiverId = receiver._id;
        (req as any).chat = chat;

        next();
    } catch (error) {
        res.status(500).send('User is not authorized');
        return;
    }
};

export default messagesMiddleware;