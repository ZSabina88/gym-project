import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/store";
import { fetchCoaches } from "../../features/Auth/CoachSlice";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { CircularProgress } from "@mui/material";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale
);

interface SessionStats {
  [key: number]: {
    dates: string[];
    sessions: number[];
  };
}

interface RatingStats {
  [key: number]: {
    rating: number;
  };
}

const AdminPanelCoaches = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCoach, setSelectedCoach] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Access state from Redux store
  const { coaches, loading, error } = useSelector(
    (state: RootState) => state.coaches
  );

  // Fetch coaches data when component mounts
  useEffect(() => {
    dispatch(fetchCoaches());
  }, [dispatch]);

  const sessionStats: SessionStats = {
    // Map your sessionStats here based on coaches
  };

  const ratingStats: RatingStats = {
    // Map your ratingStats here based on coaches
  };

  const handleCoachClick = (coachId: number) => {
    setSelectedCoach(coachId);
  };

  const handleBackClick = () => {
    setSelectedCoach(null);
  };

  const getCoachStats = (coachId: number) => {
    return sessionStats[coachId] || { dates: [], sessions: [] };
  };

  const getRatingStats = (coachId: number) => {
    return ratingStats[coachId] || { rating: 0 };
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
        <h1 className="text-2xl font-bold mb-4">Coach Statistics</h1>
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
        <div>
          <button
            onClick={handleBackClick}
            className="mb-6 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Back to All Coaches
          </button>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">
              Statistics for {coaches.find((c) => c.id === selectedCoach)?.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Session Trend</h3>
                <Line
                  data={{
                    labels: getCoachStats(selectedCoach).dates,
                    datasets: [
                      {
                        label: "Number of Sessions",
                        data: getCoachStats(selectedCoach).sessions,
                        borderColor: "rgba(75, 192, 192, 1)",
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderWidth: 2,
                        fill: true,
                        tension: 0.1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: false },
                      title: {
                        display: true,
                        text: "Sessions Over Time",
                      },
                    },
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: "Weeks",
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: "Number of Sessions",
                        },
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Coach Rating</h3>
                <Bar
                  data={{
                    labels: ["Rating"],
                    datasets: [
                      {
                        label: "Rating",
                        data: [getRatingStats(selectedCoach).rating],
                        backgroundColor: "rgba(255, 159, 64, 0.2)",
                        borderColor: "rgba(255, 159, 64, 1)",
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: false },
                      title: {
                        display: true,
                        text: "Rating",
                      },
                    },
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: "Metric",
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: "Rating",
                        },
                        beginAtZero: true,
                        suggestedMax: 5,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          {filteredCoaches.map((coach) => (
            <div
              key={coach.id}
              className={`bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition ${
                selectedCoach === coach.id ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => handleCoachClick(coach.id)}
            >
              <img
                src={coach.avatar || "default-avatar.png"} 
                alt={`${coach.name} Avatar`}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-center">
                {coach.name}
              </h2>
              <p className="text-gray-600 text-center">{coach.role}</p>
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
