import { Request, Response } from "express";

export const getChatMessages = async (req: Request, res: Response) => {
    try {
        const chat = (req as any).chat;
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