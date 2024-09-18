import { createAsyncThunk } from "@reduxjs/toolkit";
import { Workout, GetWorkouts } from "./WorkoutTypes";
import axios from "axios";

export const createWorkout = createAsyncThunk<
  Workout,
  Omit<Workout, "id">,
  { rejectValue: string }
>("workout/createWorkout", async (workoutData, { rejectWithValue }) => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    return rejectWithValue("User is not authenticated");
  }

  try {
    const response = await axios.post("/api/v1/workout", workoutData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Failed to create workout");
  }
});

export const getWorkoutAction = createAsyncThunk<
  GetWorkouts[],
  void,
  { rejectValue: string }
>("workout/getWorkouts", async (_, { rejectWithValue }) => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    return rejectWithValue("User is not authenticated");
  }

  try {
    const response = await axios.get("/api/v1/workouts", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Failed to fetch workouts");
  }
});
