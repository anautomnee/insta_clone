import express from 'express';
import User from "../db/models/User.js";
import ifAuthenticated from "../middlewares/authMiddleware.js";
import multer from "multer";

const storage = multer.memoryStorage()
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: (req, file, callback) => {
        // Allowed file extensions and MIME types
        const allowedFileTypes = ['image/svg', 'image/jpeg', 'image/jpg', 'image/png'];

        // Check MIME type
        if (allowedFileTypes.includes(file.mimetype)) {
            callback(null, true); // Accept the file
        } else {
            // Reject the file with an error
            callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Only JPEG and PNG images are allowed!'));
        }
    }
});

const router = express.Router();

router.get('/:id', ifAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        // Check if user exists
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).send('User not found');
        }
        return res.status(200).json({user});
    } catch (error) {
        console.error('Error fetching a user: ', error);
        res.status(500).send('Error fetching a user');
    }
});

router.post('/:id/update_profile', async (req, res) => {
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
            const base64EncodedImage = `data:image/${req.file.mimetype};base64,${base64Image}`;
            user.profile_image = base64EncodedImage;
        }
        const updatedUser = await user.save();
        res.status(200).send(updatedUser);
    } catch (error) {
        console.error('Error updating a user profile: ', error);
        res.status(500).send('Error updating a user profile');
    }
})

export default router;