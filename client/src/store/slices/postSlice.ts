import {PostState} from "../types/postTypes.ts";
import {createSlice} from "@reduxjs/toolkit";
import {createPost} from "../actionCreators/postActionCreators.ts";

const initialState: PostState = {
        status: 'IDLE',
        error: null,
        posts: []
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
        })
    }
});

export default postSlice.reducer;