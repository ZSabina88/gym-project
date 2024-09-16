// import { useEffect, useState } from "react";

import CalendarIMG from "../../assets/Calendar.svg";
import { useAppSelector } from "../../hooks/authHooks";
// import { workouts } from "./workouts-mock";

// interface Workout {
//   id: number;
//   name: string;
//   desc: string;
//   date: string;
// }

const Workouts: React.FC = () => {
  // const [workouts, setWorkouts] = useState<Workout[] | undefined>(undefined);
  const { workouts } = useAppSelector((state) => state.workout);

  // useEffect(() => {
  //   const fetchWorkouts = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8000/workouts");
  //       const data = await response.json();
  //       setWorkouts(data);
  //     } catch (error) {
  //       console.error('Error fetching available workouts:', error);
  //     }
  //   };
  //   fetchWorkouts();
  // }, [])

  return (
    <div className="workouts px-8 pt-8">
      <ul className="grid grid-cols-2 gap-4">
        {workouts?.map((workout) => (
          <div
            key={workout.id}
            className="p-4 bg-gray-100 flex flex-col items-start rounded-lg"
          >
            {/* <h2 className="text-xl font-semibold">{workout.}</h2> */}
            {/* <p className="text-gray-600 mt-2 text-start">{workout.}</p> */}
            <div className="flex items-center mt-2">
              <img src={CalendarIMG} alt="Calendar" className="w-5 h-5 mr-2" />
              <p className="text-black">{workout.timeSlot.date}&emsp;{workout.timeSlot.startTime}</p>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Workouts;
