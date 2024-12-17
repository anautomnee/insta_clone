import express from 'express';
import User from "../db/models/User.js";
import Post from "../db/models/Post.js";
import ifAuthenticated from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/create', ifAuthenticated, async (req, res) => {
    try {
        const { photo, content } = req.body;
        if (!photo || !content) {
            return res.status(400).send('Photo and content are required');
        }
        const user = await User.findById(req.user.id);
        const newPost = await Post.create({
            photo,
            content,
            author: user._id
        });
        return res.status(201).send('Post created successfully');
    } catch (error) {
        console.error('Error creating post: ', error);
        res.status(500).send('Error creating post');
    }
})

export default router;