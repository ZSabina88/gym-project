export interface Workout{
    id: number,
    coachId: string,
    clientId: string,
    timeSlot: {
        date: string,
        startTime: string
    },
    status: string,
    feedback: string,
}

export interface WorkoutState{
    workouts: Workout[] | [];
    loading: boolean;
    error: string | null | undefined;
}