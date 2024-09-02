import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthResponse, SignupPayload, LoginPayload } from "./AuthTypes";



export const userSignup = createAsyncThunk<
AuthResponse | any,
SignupPayload,
{ rejectValue: string }
>(
    "auth/signup",
    async ({ name, email, password, target, activity }, { rejectWithValue }) => {
        try {
            // const config = {
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // }

            // const { data } = await axios.post<AuthResponse>(
            //     "/register",
            //     { name, email, password, target, activity },
            //     config
            // );
            // if (data.error) {
            //     // console.log(data.error);
            //     return rejectWithValue(data.error);
            // }

            const response = await fetch(" https://4bkbw2t7p8.execute-api.eu-north-1.amazonaws.com/api/v1/user/register", {
                method: "POST",
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, target, activity }),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                return rejectWithValue(data.error);
            }

        } catch (error: any) {
            if (error.response.status === 400) {
                return rejectWithValue("Missing username or password.")
            } else if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);


export const userLogin = createAsyncThunk
<
AuthResponse,
LoginPayload,
{ rejectValue: string }
>
(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const { data } = await axios.post(
                "/login",
                { email, password },
                config
            );
            if (data.error) {
                return rejectWithValue(data.error);
            }


            // localStorage.setItem('userToken', data.token);
            return data;
        } catch (error: any) {
            if (error.response.status === 400) {
                return rejectWithValue("Missing username or password.")
            } else if (error.response.data.status === 401) {
                return rejectWithValue("You are not authorised. Please register.")
            } else if (error.response) {
                return rejectWithValue("No server response.")
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);