import { configureStore} from "@reduxjs/toolkit";
import { authLoginSlice, authSignupSlice } from "./AuthSLice";
// import { authLoginSlice ,authSignupSlice, authLogoutSlice } from "./AuthSLice";


const store = configureStore({
    reducer: {
        login: authLoginSlice.reducer,
        signup: authSignupSlice.reducer,
        // logout: authLogoutSlice.reducer,
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;