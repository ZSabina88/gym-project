import React from "react";
import { useNavigate } from "react-router-dom";
import coaches from "./coaches-mock";

const Coaches: React.FC = () => {
  const navigate = useNavigate();

  const handleCoachClick = (id: number) => {
    navigate(`/coaches/${id}`); // Navigate to the coach detail page
  };

  return (
    <div className="coaches">
      <div className="grid grid-cols-4 gap-4">
        {coaches.map((coach) => (
          <div
            key={coach.id}
            className="p-4 rounded-lg flex flex-col cursor-pointer"
            onClick={() => handleCoachClick(coach.id)}
          >
            <img
              src={coach.avatar}
              alt={coach.name}
              className="w-[300px] h-[200px] rounded-lg"
            />
            <div className="mt-4">
              <h2 className="font-semibold flex justify-between items-center">
                <p className="text-lg">{coach.name}</p>
                <p className="text-md flex items-center">
                  {coach.rating}{" "}
                  <span className="text-lg text-yellow-500 ml-1">★</span>
                </p>
              </h2>
              <p className="text-gray-600 text-left text-xs">{coach.role}</p>
              <p className="text-gray-600 text-left mt-4">{coach.bio}</p>
            </div>
            <button className="mt-8 bg-customGreen py-2 rounded-lg font-bold hover:bg-green-300">
              Book Workout
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coaches;
