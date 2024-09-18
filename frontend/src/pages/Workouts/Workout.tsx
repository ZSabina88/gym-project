import React, { useEffect } from "react";
import CalendarIMG from "../../assets/Calendar.svg";
import { getWorkoutAction } from "../../features/WorkoutBooking/WorkoutActions"; 
import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/DispatchHook";

const Workouts: React.FC = () => {
  const dispatch = useAppDispatch();

  const { getWorkouts, loading, error } = useAppSelector((state) => state.getWorkouts);

  useEffect(() => {
    dispatch(getWorkoutAction());
  }, [dispatch]);

  console.log(getWorkouts);

  const handleCancelWorkout = (workoutId: number) => {
    console.log(`Canceling workout with ID: ${workoutId}`);
  };

  const handleFinishWorkout = (workoutId: number) => {
    console.log(`Finishing workout with ID: ${workoutId}`);
  };

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        <CircularProgress sx={{ color: "#9EF300" }} />
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="workouts px-8 pt-8">
      <ul className="grid grid-cols-2 gap-4">
        {getWorkouts?.map((workout, index) => (
          <div
            key={workout.workoutId || index}
            className="p-4 bg-gray-100 flex flex-col items-start rounded-lg"
          >
            <div className="w-full flex justify-between">
              <p>Yoga</p>
              <div className="bg-blue-400 px-3 py-1 rounded-2xl text-white">
                {workout.status}
              </div>
            </div>
            <div className="flex items-center mt-2">
              <img src={CalendarIMG} alt="Calendar" className="w-5 h-5 mr-2" />
              <p className="text-black">
                {workout.date} &emsp; {workout.startTime}
              </p>
            </div>

            <div className="mt-8 w-full flex justify-end gap-4">
              <button
                className="border-2  border-black text-black px-4 py-2 rounded-lg "
                onClick={() => handleCancelWorkout(workout.workoutId)}
              >
                Cancel Workout
              </button>
              <button
                className="bg-customGreen text-black px-4 py-2 rounded-lg hover:bg-green-600"
                onClick={() => handleFinishWorkout(workout.workoutId)}
              >
                Finish Workout
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Workouts;
