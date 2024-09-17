export enum WorkoutStatus {
  Scheduled = "scheduled",
  Canceled = "canceled",
  Finished = "finished",
}

export interface Workout {
  id: number;
  coachId: string;
  clientId: string;
  date: string;
  startTime: string;

  status: WorkoutStatus;
  feedback: string;
}

export interface WorkoutState {
  workouts: Workout[] | null;
  loading: boolean;
  error: string | null | undefined;
}
