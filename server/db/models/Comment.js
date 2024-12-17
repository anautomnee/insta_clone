import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    post: {type: mongoose.Schema.Types.ObjectId, ref: "Post"},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    content: {type: String, required: true},
    like_count: {type: Number, required: true},
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: "Like"}],
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;