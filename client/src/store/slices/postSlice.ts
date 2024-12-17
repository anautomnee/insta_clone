import {PostState} from "../types/postTypes.ts";
import {createSlice} from "@reduxjs/toolkit";

const initialState: PostState = {
        status: 'IDLE',
        error: null,
        id: '',
        author: 'string',
        photo: 'string',
        content: '',
        createdAt: new Date(),
        like_count: 0,
        likes: [],
        comments: []
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {}
});

export default postSlice.reducer;