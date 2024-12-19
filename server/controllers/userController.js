import User from "../db/models/User.js";

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password')
            .populate('followings').populate('followers').populate('posts');
        if (!user) {
            return res.status(404).send('User not found');
        }
        return res.status(200).send(user);
    } catch (error) {
        console.error('Error fetching a user: ', error);
        res.status(500).send('Error fetching a user');
    }
};

export const updateProfile = async (req, res) => {
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
};