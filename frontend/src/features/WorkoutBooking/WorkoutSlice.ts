import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkoutState, Workout, GetWorkoutState, GetWorkouts } from "./WorkoutTypes";
import { createWorkout, getWorkoutAction } from "./WorkoutActions";

const initialState: WorkoutState = {
  workouts: [],
  loading: false,
  error: null,
};

const initialStateGetWorkouts: GetWorkoutState = {
  getWorkouts: [],
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
      .addCase(createWorkout.rejected, (state, action: PayloadAction<string | null | undefined>) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const getWorkoutSlice = createSlice({
  name: "getWorkout",
  initialState: initialStateGetWorkouts,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWorkoutAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWorkoutAction.fulfilled, (state, action: PayloadAction<GetWorkouts[]>) => {
        state.loading = false;
        state.getWorkouts = action.payload;
      }
      )
      .addCase(getWorkoutAction.rejected, (state, action: PayloadAction<string | null | undefined>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default workoutSlice;