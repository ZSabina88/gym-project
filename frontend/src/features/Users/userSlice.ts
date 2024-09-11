import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, updateUserRole } from "./UserActions";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  activity: string;
  target: string;
}

interface UsersState {
  users: User[];
  error: string | null | undefined;
  loading: boolean;
}

const initialState: UsersState = {
  users: [],
  error: null,
  loading: false,
};



const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      })
      .addCase(updateUserRole.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.users.findIndex(
          (user) => user.id === updatedUser.id
        );
        if (index !== -1) {
          state.users[index].role = updatedUser.role;
        }
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.error = action.payload || "An error occurred";
      });
  },
});

export default usersSlice;
