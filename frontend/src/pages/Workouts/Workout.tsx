import React from "react";

import CalendarIMG from "../../assets/Calendar.svg";
import { workouts } from "./workouts-mock";

const Workouts: React.FC = () => {
  return (
    <div className="workouts px-8 pt-8">
      <ul className="grid grid-cols-2 gap-4">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="p-4 bg-gray-100 flex flex-col items-start rounded-lg"
          >
            <h2 className="text-xl font-semibold">{workout.name}</h2>
            <p className="text-gray-600 mt-2 text-start">{workout.desc}</p>
            <div className="flex items-center mt-2">
              <img src={CalendarIMG} alt="Calendar" className="w-5 h-5 mr-2" />
              <p className="text-black">{workout.date}</p>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Workouts;
