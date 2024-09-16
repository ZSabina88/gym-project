import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkoutState } from "./WorkoutTypes";
import { createWorkout } from "./WorkoutActions";

const initialState: WorkoutState = {
  workouts: [],
  loading: false,
  error: null,
};

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createWorkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //   .addCase(createWorkout.fulfilled, (state, action: PayloadAction<Workout>) => {
      //     state.loading = false;
      //     state.workouts.push(action.payload);
      //   })
      .addCase(createWorkout.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default workoutSlice;
