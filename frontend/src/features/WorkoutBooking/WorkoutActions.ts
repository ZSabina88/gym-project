import { createAsyncThunk } from "@reduxjs/toolkit";
import { Workout } from "./WorkoutTypes";
import axios from "axios";

export const createWorkout = createAsyncThunk(
    "workout/createWorkout",
    async (workoutData: Omit<Workout, "id">, { rejectWithValue }) => {
        const token = localStorage.getItem("userToken");

        try {
            const response = await axios.post("add url later", workoutData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to create workout");
        }
    }
);