import coaches from "../../pages/Coaches/coaches-mock";
import  { useState } from "react";
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

const AdminPanel = () => {
  const [selectedCoach, setSelectedCoach] = useState<number | null>(null);

  const sessionStats: SessionStats = {
    1: {
      dates: ["Week 1", "Week 2", "Week 3", "Week 4"],
      sessions: [20, 25, 30, 15],
    },
    2: {
      dates: ["Week 1", "Week 2", "Week 3", "Week 4"],
      sessions: [15, 18, 22, 28],
    },
    3: {
      dates: ["Week 1", "Week 2", "Week 3", "Week 4"],
      sessions: [10, 20, 15, 25],
    },
    4: {
      dates: ["Week 1", "Week 2", "Week 3", "Week 4"],
      sessions: [12, 24, 18, 30],
    },
    5: {
      dates: ["Week 1", "Week 2", "Week 3", "Week 4"],
      sessions: [30, 22, 26, 20],
    },
    6: {
      dates: ["Week 1", "Week 2", "Week 3", "Week 4"],
      sessions: [17, 19, 21, 23],
    },
    7: {
      dates: ["Week 1", "Week 2", "Week 3", "Week 4"],
      sessions: [20, 25, 15, 30],
    },
    8: {
      dates: ["Week 1", "Week 2", "Week 3", "Week 4"],
      sessions: [25, 30, 20, 10],
    },
  };

  const ratingStats: RatingStats = {
    1: {
      rating: 4.5,
    },
    2: {
      rating: 4.2,
    },
    3: {
      rating: 4.7,
    },
    4: {
      rating: 4.0,
    },
    5: {
      rating: 4.3,
    },
    6: {
      rating: 4.6,
    },
    7: {
      rating: 4.1,
    },
    8: {
      rating: 4.4,
    },
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Coach Statistics</h1>
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
          {coaches.map((coach) => (
            <div
              key={coach.id}
              className={`bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition ${
                selectedCoach === coach.id ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => handleCoachClick(coach.id)}
            >
              <img
                src={coach.avatar}
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

export default AdminPanel;
