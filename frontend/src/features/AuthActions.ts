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
        "http://localhost:3000/api/v1/user/register", 
        { name, email, password, target, activity },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

 
      console.log("Signup Response:", data);

      if (response.status !== 201) {
        return rejectWithValue(data.error || "An error occurred");
      }

    
      if (data.userId) {
        return { userId: data.userId };
      } else {

        console.error("User ID is missing from response");
        return rejectWithValue("User ID is missing from response");
      }
    } catch (error: any) {
 
      console.error("Signup Error:", error);
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

export const userLogin = createAsyncThunk<
  AuthResponse, 
  LoginPayload,
  { rejectValue: string } 
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/login", 
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    
    console.log("Login Response:", data);

    if (response.status !== 200) {
      return rejectWithValue(data.error || "An error occurred");
    }

 
    if (data.token) {
      return { token: data.token };
    } else {

      console.error("Token is missing from response");
      return rejectWithValue("Token is missing from response");
    }
  } catch (error: any) {
 
    console.error("Login Error:", error);
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
