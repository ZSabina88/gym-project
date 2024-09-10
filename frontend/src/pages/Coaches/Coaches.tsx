import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../features/store";
import { Coach, fetchCoaches } from "../../features/Users/CoachSlice";
import pic from "../../assets/Avatar.png";
import { CircularProgress } from "@mui/material";

const Coaches: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { coaches, loading, error } = useSelector(
    (state: RootState) => state.coaches
  );

  useEffect(() => {
    dispatch(fetchCoaches());
  }, [dispatch]);

  const handleCoachClick = (coach: Coach) => {
    navigate(`/coaches/${coach.id}`, { state: { coach } });
  };

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        <CircularProgress sx={{ color: "#9EF300" }} />
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="coaches">
      <div className="grid grid-cols-4 gap-4">
        {coaches.map((coach) => (
          <div
            key={coach.id}
            className="p-4 rounded-lg flex flex-col cursor-pointer"
            onClick={() => handleCoachClick(coach)}
          >
            <img
              src={pic} // Placeholder image
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
              <p className="text-gray-600 text-left text-xs">
                {coach.activity}
              </p>
              <p className="text-gray-600 text-left mt-4">
                {coach.description}
              </p>
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
