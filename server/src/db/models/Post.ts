import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    photo: {type: String, required: true},
    content: {type: String, required: true, maxlength: 2200},
    createdAt: {type: Date, default: Date.now},
    like_count: {type: Number, default: 0},
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: "Like"}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
});

const Post = mongoose.model("Post", PostSchema);

export default Post;