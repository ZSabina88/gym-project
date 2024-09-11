import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
  error: string | null;
  loading: boolean;
}

const initialState: UsersState = {
  users: [],
  error: null,
  loading: false,
};

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("users/fetchUsers", async (_, { rejectWithValue }) => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    return rejectWithValue("Token not available");
  }

  try {
    const response = await axios.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Fetch Users Error:", error);
    return rejectWithValue(error.response?.data.message || "An error occurred");
  }
});

export const updateUserRole = createAsyncThunk<
  User,
  { userId: string; role: string; email: string },
  { rejectValue: string }
>(
  "users/updateUserRole",
  async ({ userId, role, email }, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      return rejectWithValue("Token not available");
    }

    try {
      const response = await axios.put(
        "/api/v1/admin/role-change",
        { userId, newRole: role, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error("Update User Role Error:", error);
      return rejectWithValue(
        error.response?.data.message ||
          "An error occurred while updating the role"
      );
    }
  }
);

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
