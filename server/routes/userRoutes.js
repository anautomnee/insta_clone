import express from 'express';
import User from "../db/models/User.js";
import ifAuthenticated from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get('/:id', ifAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        // Check if user exists
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).send('User not found');
        }
        console.log(user)
        return res.status(200).json({user, fullName: user.full_name});
    } catch (error) {
        console.error('Error fetching a user: ', error);
        res.status(500).send('Error fetching a user');
    }
});

export default router;