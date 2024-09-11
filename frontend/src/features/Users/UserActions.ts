import { User } from "./UserSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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