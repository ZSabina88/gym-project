import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthResponse, SignupPayload, LoginPayload } from "./AuthTypes";

export const userSignup = createAsyncThunk<
    { userId: string },
    SignupPayload,
    { rejectValue: string }
>(
    "auth/signup",
    async ({ name, email, password, target, activity }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "/api/v1/user/register",
                { name, email, password, target, activity },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = response.data;

            console.log("Signup Response:", data);

            return data;
        } catch (error: any) {
            console.error("Signup Error:", error);
            if (error.response) {
                if (error.response.status === 500) {
                    return rejectWithValue("There already exist user with that email.");
                } else {
                    return rejectWithValue("Server error.");
                }
            } else {
                return rejectWithValue(error.message || "An error occurred");
            }
        }
    }
);

export const userLogin = createAsyncThunk<
    AuthResponse | any,
    LoginPayload,
    { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const { data } = await axios.post(
            "/api/v1/user/login",
            { email, password },
            config
        );
        if (data.error) {
            return rejectWithValue(data.error);
        }

        localStorage.setItem('userToken', data.token);
        return data;
    } catch (error: any) {
        console.log("Login Error:", error);
        if (error.response) {
            if (error.response.status === 400) {
                return rejectWithValue("Missing email or password.");
            } else if (error.response.status === 401) {
                return rejectWithValue("Unauthorized. Please check your credentials.");
            } else {
                return rejectWithValue("Server error.");
            }
        } else {
            return rejectWithValue(error.message || "An error occurred");
        }
    }
});



