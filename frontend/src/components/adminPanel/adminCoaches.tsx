// src/components/AdminPanelCoaches.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/store";
import { Coach, fetchCoaches } from "../../features/Users/CoachSlice";
import pic from "../../assets/Avatar.png";
import { CircularProgress } from "@mui/material";
import SelectedCoach from "./selectedCoach";

interface SessionStats {
  [key: string]: {
    dates: string[];
    sessions: number[];
  };
}

interface RatingStats {
  [key: string]: {
    rating: number;
  };
}

const generateMockData = (
  coaches: Coach[]
): { sessionStats: SessionStats; ratingStats: RatingStats } => {
  const sessionStats: SessionStats = {};
  const ratingStats: RatingStats = {};

  coaches.forEach((coach) => {
    sessionStats[coach.id] = {
      dates: [
        "2023-09-01",
        "2023-09-08",
        "2023-09-15",
        "2023-09-22",
        "2023-09-29",
      ],
      sessions: Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)),
    };

    ratingStats[coach.id] = {
      rating: parseFloat((Math.random() * 5).toFixed(1)),
    };
  });

  return { sessionStats, ratingStats };
};

const AdminPanelCoaches = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { coaches, loading, error } = useSelector(
    (state: RootState) => state.coaches
  );

  const [sessionStats, setSessionStats] = useState<SessionStats>({});
  const [ratingStats, setRatingStats] = useState<RatingStats>({});

  useEffect(() => {
    dispatch(fetchCoaches());
  }, [dispatch]);

  useEffect(() => {
    if (coaches.length > 0) {
      const { sessionStats, ratingStats } = generateMockData(coaches);
      setSessionStats(sessionStats);
      setRatingStats(ratingStats);
    }
  }, [coaches]);

  const handleCoachClick = (coach: Coach) => {
    setSelectedCoach(coach);
  };

  const handleBackClick = () => {
    setSelectedCoach(null);
  };

  const filteredCoaches = coaches.filter((coach) =>
    coach.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        <CircularProgress sx={{ color: "#9EF300" }} />
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-bold mb-4">Coach List</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by coach name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-lg w-full"
          />
        </div>
      </div>
      {selectedCoach ? (
        <SelectedCoach
          coach={selectedCoach}
          sessionStats={
            sessionStats[selectedCoach.id] || { dates: [], sessions: [] }
          }
          ratingStats={ratingStats[selectedCoach.id] || { rating: 0 }}
          onBackClick={handleBackClick}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          {filteredCoaches.map((coach) => (
            <div
              key={coach.id}
              className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition"
              onClick={() => handleCoachClick(coach)}
            >
              <img
                src={pic}
                alt={`${coach.name} Avatar`}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-center">
                {coach.name}
              </h2>
              <p className="text-yellow-500 text-center mt-2">
                Rating: {coach.rating}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanelCoaches;
