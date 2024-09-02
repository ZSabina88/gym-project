import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userSignup } from "./AuthActions";

// const userToken = localStorage.getItem('userToken')
//     ? localStorage.getItem('userToken')
//     : null;

const getInitialCredentials = () => {
    const localcredentials = window.localStorage.getItem("credentials");
    if (localcredentials) {
        return JSON.parse(localcredentials);
    }
    window.localStorage.setItem("credentials", JSON.stringify([]));
    return [];
}
type Auth = {
    userInfo: null | {} | undefined | any,
    // userToken: string,
    error: null | string | unknown,
    loading: boolean,
    // success: boolean
}

const initialState: Auth = {
    userInfo: getInitialCredentials(),
    // userToken: "",
    error: null,
    loading: false,
    // success: false
};



const authSignupSlice = createSlice({
    name: "authsignup",
    initialState,
    reducers: {
        signup(state, action) {
            console.log("action", action)

            state.userInfo = action.payload;

            const credentialList = window.localStorage.getItem("credentials");
            if (credentialList) {
                const credArr = JSON.parse(credentialList);
                credArr.push( action.payload );
                window.localStorage.setItem("credentials", JSON.stringify(credArr))
            }
        },
        logout(state) {
            // state.userInfo: null;
            localStorage.clear();
          },

    },
    extraReducers:
        (builder) => {
            builder.addCase(userSignup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            builder.addCase(userSignup.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // state.success = true;
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
    reducers: {
        // logout: (state) => {
        //     state.userInfo: null;
        //   },
    },
    extraReducers:
        (builder) => {
            builder.addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            builder.addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // state.success = true;
                state.userInfo = action.payload;
                // state.userToken = action.payload.token;
                // console.log(action.payload.token);
            })

            builder.addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                // state.error = action.error.message;
            })
        }
});

export const { signup, logout } = authSignupSlice.actions;


export { authLoginSlice, authSignupSlice };