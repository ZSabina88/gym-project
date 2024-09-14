import React from "react";
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
import jsPDF from "jspdf";

import * as XLSX from "xlsx";
import autoTable from "jspdf-autotable";

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
  dates: string[];
  sessions: number[];
}

interface RatingStats {
  rating: number;
}

interface SelectedCoachProps {
  coach: {
    id: string;
    name: string;
  };
  sessionStats: SessionStats;
  ratingStats: RatingStats;
  onBackClick: () => void;
}

const SelectedCoach: React.FC<SelectedCoachProps> = ({
  coach,
  sessionStats,
  ratingStats,
  onBackClick,
}) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`Statistics for ${coach.name}`, 14, 20);

    doc.setFontSize(14);
    doc.text("Coach Rating:", 14, 30);
    doc.setFontSize(12);
    doc.text(`Rating: ${ratingStats.rating}`, 14, 40);

    const sessionTableData = sessionStats.dates.map((date, index) => ({
      Date: date,
      Sessions: sessionStats.sessions[index],
    }));

    autoTable(doc, {
      startY: 50,
      head: [["Date", "Sessions"]],
      body: sessionTableData.map((item) => [item.Date, item.Sessions]),
      theme: "striped",
      headStyles: { fillColor: [22, 160, 133] },
      styles: { cellPadding: 5, fontSize: 10 },
    });

    doc.save("coach_statistics.pdf");
  };

  const generateExcel = () => {
    const ws = XLSX.utils.json_to_sheet([
      {
        "Coach Name": coach.name,
        Rating: ratingStats.rating,
        "Session Dates": sessionStats.dates.join(", "),
        Sessions: sessionStats.sessions.join(", "),
      },
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Statistics");
    XLSX.writeFile(wb, "coach_statistics.xlsx");
  };

  return (
    <div>
      <button
        onClick={onBackClick}
        className="mb-6 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Back to All Coaches
      </button>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Statistics for {coach.name}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Session Trend</h3>
            <Line
              data={{
                labels: sessionStats.dates,
                datasets: [
                  {
                    label: "Number of Sessions",
                    data: sessionStats.sessions,
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
                    data: [ratingStats.rating],
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
        <div className="flex mb-4 space-x-4 w-full justify-center mt-16">
          <button
            onClick={generatePDF}
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Download PDF
          </button>
          <button
            onClick={generateExcel}
            className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
          >
            Download Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedCoach;
