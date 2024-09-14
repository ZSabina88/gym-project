import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInfo, UserPayload, User } from "./SingleUserType";
import axios from "axios";

export const fetchUser = createAsyncThunk<
    User,
    void,
    { rejectValue: string }
>("user/fetchUser", async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");

    if (!token) {
        return rejectWithValue("Token not available");
    }

    try {
        const response = await axios.get("/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Fetch User Error:", error);
        return rejectWithValue(error.response?.data.message || "An error occurred");
    }
});

export const changeUserInfo = createAsyncThunk<
    UserInfo,
    UserPayload,
    { rejectValue: string }
>(
    "user/changeUserInfo",
    async ({ name, target, activity }, { rejectWithValue }) => {
        const token = localStorage.getItem("userToken");

        if (!token) {
            return rejectWithValue("Token not available");
        }

        try {
            const response = await axios.put(
                "/user",
                { name, target, activity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message || "An error occurred while updating user info");
            }
            console.error("Update User Info Error:", error);
            return rejectWithValue("An unexpected error occurred");
        }
    }
);