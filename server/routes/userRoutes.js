import express from 'express';
import User from "../db/models/User.js";
import ifAuthenticated from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadImage.js";

const router = express.Router();

router.get('/:id', ifAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        // Conditionally populate based on the array contents
        let query = User.findById(id).select('-password'); // Start the query again for populating

        if (!query) {
            return res.status(404).send('User not found');
        }
        if (query.posts && query.posts.length > 0) {
            query = query.populate('posts', 'content createdAt'); // Populate posts if not empty
        }
        if (query.followers && query.followers.length > 0) {
            query = query.populate('followers', 'username bio'); // Populate followers if not empty
        }
        if (query.followings && query.followings.length > 0) {
            query = query.populate('followings', 'username bio'); // Populate followings if not empty
        }

        // Execute the final query
        const user = await query.exec();
        return res.status(200).json({user});
    } catch (error) {
        console.error('Error fetching a user: ', error);
        res.status(500).send('Error fetching a user');
    }
});

router.post('/:id/update_profile', upload.single('photo'), async (req, res) => {
    try {
        const { id } = req.params;

        // Check if user exists
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).send('User not found');
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
})

export default router;