import { configureStore} from "@reduxjs/toolkit";
import { authLoginSlice ,authSignupSlice } from "./Auth/AuthSLice";


const store = configureStore({
    reducer: {
        login: authLoginSlice.reducer,
        signup: authSignupSlice.reducer,
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;