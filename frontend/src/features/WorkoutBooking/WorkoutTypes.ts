export enum WorkoutStatus {
  Scheduled = "scheduled",
  Canceled = "canceled",
  Finished = "finished",
}

export interface Workout {
  id: number;
  coachId: string;
  clientId: string;
  timeSlot: {
    date: string,
    startTime: string
  },
  status: WorkoutStatus;
  feedback: string;
}

export interface GetWorkouts {
  workoutId: number;
  coachId: string;
  clientId: string;
  status: WorkoutStatus;
  date: string,
  startTime: string
}

export interface WorkoutState {
  workouts: Workout[] | null;
  loading: boolean;
  error: string | null | undefined;
}

export interface GetWorkoutState {
  getWorkouts: GetWorkouts[] | null;
  loading: boolean;
  error: string | null | undefined;
}
