import mongoose from "mongoose";
import fs from "fs";
import path from "path";

// Get the directory name from the import.meta.url
// const __dirname = path.dirname(new URL(import.meta.url).pathname);
// Convert the default image to a Base64 string
const defaultImagePath = path.join(__dirname, '../../public/default_image.png');
const defaultImageBase64 = `data:image/png;base64,${fs.readFileSync(defaultImagePath).toString('base64')}`;

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    full_name: {type: String, required: true},
    password: {type: String, required: true},
    bio: {type: String, default: ""},
    profile_image: {type: String, default: defaultImageBase64},
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    followings: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
});

const User = mongoose.model("User", UserSchema);

export default User;