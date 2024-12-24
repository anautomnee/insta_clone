import {PostState} from "../types/postTypes.ts";
import {createSlice} from "@reduxjs/toolkit";
import {createPost, fetchPost} from "../actionCreators/postActionCreators.ts";

const initialState: PostState = {
        status: 'IDLE',
        error: null,
        _id: '',
        author: null,
        photo: '',
        content: '',
        createdAt: null,
        like_count: 0,
        likes: [],
        comments: [],
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(createPost.pending, (state) => {
            state.status = 'LOADING';
            state.error = null;
        }).addCase(createPost.fulfilled, (state) => {
            state.status = 'CREATED';
            state.error = null;
        }).addCase(createPost.rejected, (state, action) => {
            state.status = 'FAILED';
            console.log(action);
            state.error = action.error.message || "Post creation failed";
        }).addCase(fetchPost.pending, (state) => {
            state.status = 'LOADING';
            state.error = null;
        }).addCase(fetchPost.fulfilled, (state, action) => {
            state.status = 'FETCHED';
            state.error = null;
            state._id = action.payload._id;
            state.author = action.payload.author;
            state.photo = action.payload.photo;
            state.content = action.payload.content;
            state.createdAt = action.payload.createdAt;
            state.like_count = action.payload.like_count;
            state.likes = action.payload.likes;
            state.comments = action.payload.comments;
        }).addCase(fetchPost.rejected, (state, action) => {
            state.status = 'FAILED';
            console.log(action);
            state.error = action.error.message || "Post fetch failed";
        })
    }
});

export default postSlice.reducer;