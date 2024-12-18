import express from 'express';
import User from "../db/models/User.js";
import Post from "../db/models/Post.js";
import ifAuthenticated from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadImage.js";

const router = express.Router();

router.post('/create', upload.single('photo'), ifAuthenticated, async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).send('Photo and content are required');
        }
        const user = await User.findById(req.user.id);
        if (req.file) {
            const base64Image = req.file.buffer.toString('base64');
            const base64EncodedImage = `data:image/${req.file.mimetype};base64,${base64Image}`;

            await Post.create({
                photo: base64EncodedImage,
                content,
                author: user._id
            });
            return res.status(201).send('Post created successfully');
        }else {
            return res.status(500).send('Photo error occurred');
        }
    } catch (error) {
        console.error('Error creating post: ', error);
        res.status(500).send('Error creating post');
    }
})

export default router;