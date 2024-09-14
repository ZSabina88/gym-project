import { createSlice } from "@reduxjs/toolkit";
import { UserState, ChangeInfoState } from "./SingleUserType";
import { fetchUser, changeUserInfo } from "./SingleUserAction";



const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const initialStateChangeInfo: ChangeInfoState = {
  changeInfo: null,
  loading: false,
  error: null,
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const changeInfoSlice = createSlice({
  name: "changeInfo",
  initialState: initialStateChangeInfo,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.changeInfo = action.payload;
      })
      .addCase(changeUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice;
export { changeInfoSlice };
