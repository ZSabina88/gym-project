import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkoutState, Workout } from "./WorkoutTypes";
import { createWorkout, getWorkouts } from "./WorkoutActions";

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
      .addCase(
        createWorkout.fulfilled,
        (state, action: PayloadAction<Workout>) => {
          state.loading = false;
          state.workouts?.push(action.payload);
        }
      )
      .addCase(createWorkout.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

    
      .addCase(getWorkouts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getWorkouts.fulfilled,
        (state, action: PayloadAction<Workout[]>) => {
          state.loading = false;
          state.workouts = action.payload;
        }
      )
      .addCase(getWorkouts.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default workoutSlice;
