import { Request, Response } from "express";
import Chat from "../db/models/Chat";
import Message from "../db/models/Message.ts";

export const startChat = async (req: Request, res: Response) => {
  try {
      const authorId = (req as any).authorId;
      const receiverId = (req as any).receiverId;
      const chat = (req as any).chat;
      if (chat) {
          res.status(400).send('Chat already exists');
          return;
      }
      await Chat.create({
          user1: authorId,
          user2: receiverId
      })
      res.status(201).send('Chat created successfully.');

  } catch (error) {
      console.error('Error starting a chat: ', error);
      res.status(500).send('Error starting a chat');
  }
};

export const saveMessage = async (req: Request, res: Response) => {
    try {
        const authorId = (req as any).authorId;
        const receiverId = (req as any).receiverId;
        const chat = (req as any).chat;

        const {content} = req.body;
        if (!content) {
            res.status(400).send('Receiver, sender and content must be provided');
            return;
        }
        const newMessage = await Message.create({
           author: authorId,
            receiver: receiverId,
            content: content,
        });
        chat.messages.push(newMessage._id);
        await chat.save();
        res.status(201).send('Message saved');
    } catch (error) {
        console.error('Error saving message: ', error);
        res.status(500).send('Error saving message');
    }
};

export const getChatMessages = async (req: Request, res: Response) => {
    try {
        const chat = (req as any).chat;
        console.log(chat);
        if (!chat) {
            res.status(404).send('No chat found between these users');
            return;
        }
        res.status(200).send(chat.messages);
    } catch (error) {
        console.error('Error getting chat: ', error);
        res.status(500).send('Error getting chat');
    }
}