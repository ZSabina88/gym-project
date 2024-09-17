import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/DispatchHook";
import { useNavigate } from "react-router-dom";
import { Coach, fetchCoaches } from "../../features/Users/CoachSlice";
import pic from "../../assets/Avatar.png";
import { CircularProgress } from "@mui/material";

const Coaches: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { coaches, loading, error } = useAppSelector((state) => state.coaches);

  const [currentPage, setCurrentPage] = useState(1);
  const coachesPerPage = 8;
  const indexOfLastCoach = currentPage * coachesPerPage;
  const indexOfFirstCoach = indexOfLastCoach - coachesPerPage;
  const currentCoaches = coaches.slice(indexOfFirstCoach, indexOfLastCoach);
  const totalPages = Math.ceil(coaches.length / coachesPerPage);

  useEffect(() => {
    dispatch(fetchCoaches());
  }, [dispatch]);

  const handleCoachClick = (coach: Coach) => {
    navigate(`/coaches/${coach.id}`, { state: { coach } });
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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
        {currentCoaches.map((coach) => (
          <div
            key={coach.id}
            className="p-4 rounded-lg flex flex-col cursor-pointer"
            onClick={() => handleCoachClick(coach)}
          >
            <img
              src={pic} 
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

      {coaches.length > coachesPerPage && (
        <div className="pagination mt-8 flex justify-center">
          <button
            className="bg-gray-300 py-2 px-4 rounded-lg mx-1 hover:bg-gray-400"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`py-2 px-4 rounded-lg mx-1 ${
                index + 1 === currentPage ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="bg-gray-300 py-2 px-4 rounded-lg mx-1 hover:bg-gray-400"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Coaches;
