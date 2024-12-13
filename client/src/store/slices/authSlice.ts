import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authStateType, loginPayloadType} from '../types/authTypes.ts';
import {registerUser, resetPassword, userLogin} from '../selectors/actionCreators.ts';

const initialState:authStateType = {
    status: 'IDLE',
    error: null,
    userToken: null,
    userInfo: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => {
            localStorage.removeItem('userToken');
            return initialState}
    },
    extraReducers: builder => {
        builder.addCase(registerUser.pending, (state) => {
            state.status = 'LOADING';
            state.error = null;
        }).addCase(registerUser.fulfilled, (state) => {
            state.status = 'REGISTERED';
            state.error = null;
        }).addCase(registerUser.rejected, (state, action) => {
            state.status = 'FAILED';
            console.log(action);
            state.error = action.error.message || "Registration failed";
        }).addCase(userLogin.pending, (state) => {
            state.status = 'LOADING';
            state.error = null;
        }).addCase(userLogin.fulfilled, (state, action: PayloadAction<loginPayloadType>) => {
            state.status = 'SUCCEEDED';
            state.error = null;
            state.userToken = action.payload.data.token;
            state.userInfo = action.payload.data.username;
        }).addCase(userLogin.rejected, (state, action) => {
            state.status = 'FAILED';
            console.log(action);
            state.error = action.error.message || "Login failed";
        }).addCase(resetPassword.pending, (state) => {
        state.status = 'LOADING';
        state.error = null;
        }).addCase(resetPassword.fulfilled, () => initialState)
            .addCase(resetPassword.rejected, (state, action) => {
            state.status = 'FAILED';
            console.log(action);
            state.error = action.error.message || "Reset failed";
        })
    }
})

export default authSlice.reducer;
export const {logout} = authSlice.actions;