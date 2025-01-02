import mongoose, {Document} from "mongoose";
import fs from "fs";
import path from "path";

const defaultImagePath = path.join(__dirname, '../../public/default_image.png');
const defaultImageBase64 = `data:image/png;base64,${fs.readFileSync(defaultImagePath).toString('base64')}`;

export interface UserType extends Document {
    _id: string | mongoose.Types.ObjectId;
    username: string;
    email: string;
    full_name: string;
    password: string;
    bio: string;
    website: string;
    profile_image: string;
    notifications:  mongoose.Types.ObjectId[];
    posts: mongoose.Types.ObjectId[];
    followers: mongoose.Types.ObjectId[];
    followings: mongoose.Types.ObjectId[];
}

const UserSchema = new mongoose.Schema<UserType>({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    full_name: {type: String, required: true},
    password: {type: String, required: true},
    bio: {type: String, default: "", maxlength: 180},
    website: {type: String, maxlength: 120},
    profile_image: {type: String, default: defaultImageBase64},
    notifications: [{type: mongoose.Types.ObjectId, ref: "Notification"}],
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    followings: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
});

const User = mongoose.model<UserType>("User", UserSchema);

export default User;