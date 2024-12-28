import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchUser} from "../actionCreators/userActionCreators.ts";
import {UserState} from "../types/userTypes.ts";
import {User} from "../types/instanceTypes.ts";

const initialState: UserState = {
    _id: '',
    username: '',
    email: '',
    full_name: '',
    profile_image: '',
    bio: '',
    posts: [],
    followers: [],
    followings: [],
    status: 'IDLE',
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchUser.pending, (state) => {
            state.status = 'LOADING';
            state.error = null;
        }).addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.status = 'FETCHED';
            state.error = null;
            state._id = action.payload._id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.full_name = action.payload.full_name;
            state.profile_image = action.payload.profile_image;
            state.bio = action.payload.bio;
            state.posts = action.payload.posts;
            state.followers = action.payload.followers;
            state.followings = action.payload.followings;

        }).addCase(fetchUser.rejected, (state, action) => {
            state.status = 'FAILED';
            console.log(action);
            state.error = action.error.message || "Registration failed";
        })
    }
});
export default userSlice.reducer;