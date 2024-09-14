import { configureStore } from "@reduxjs/toolkit";
import { authLoginSlice, authSignupSlice } from "./Auth/AuthSLice";
import coachesSlice from "./Users/CoachSlice";
import usersSlice from "./Users/UserSlice";

const store = configureStore({
  reducer: {
    login: authLoginSlice.reducer,
    signup: authSignupSlice.reducer,
    coaches: coachesSlice.reducer,
    users: usersSlice.reducer,
    user: userSlice.reducer,
    changeInfo: changeInfoSlice.reducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
