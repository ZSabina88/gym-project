import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userSignup, userLogout } from "./AuthActions";

const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null;

type Auth = {
    userInfo: null | {} | undefined | any,
    userToken: string | null,
    error: null | string | unknown,
    loading: boolean,
}

const initialState: Auth = {
    userInfo: [],
    userToken,
    error: null,
    loading: false,
};



const authSignupSlice = createSlice({
    name: "authsignup",
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(userSignup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            builder.addCase(userSignup.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.userInfo = action.payload;

            })

            builder.addCase(userSignup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
        }
});
const authLoginSlice = createSlice({
    name: "authLogin",
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            builder.addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.userInfo = action.payload;
                state.userToken = action.payload.token;
            })

            builder.addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
        }
});

const authLogoutSlice = createSlice({
    name: "authLogout",
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(userLogout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            builder.addCase(userLogout.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                state.userInfo = null;
                state.userToken = null;
            })

            builder.addCase(userLogout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
        }
});


export { authLoginSlice, authSignupSlice, authLogoutSlice };