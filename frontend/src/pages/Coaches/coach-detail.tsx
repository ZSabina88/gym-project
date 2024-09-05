import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar"; // Import the Calendar component
import coaches from "./coaches-mock";
import Button from "../../shared/Buttons/button";
import "react-calendar/dist/Calendar.css"; // Import default styles for the calendar
import "./calendar-custom.css"; // Import custom styles

const CoachDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const coach = coaches.find((c) => c.id === parseInt(id || "0"));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  if (!coach) {
    return <p>Coach not found</p>;
  }

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  // Format the selected date to "Jul 3" or "Sep 4"
  const formatDate = (date: Date) => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    });
    return formatter.format(date);
  };

  return (
    <div className="p-8 flex ">
      <div className="w-1/3 flex flex-col ">
        <div className="w-[320px] flex flex-col">
          <img
            src={coach.avatar}
            alt={coach.name}
            className="w-[320px] h-[200px] rounded-lg"
          />
          <h2 className="text-lg font-semibold mt-4 text-start flex justify-between">
            {coach.name}
            <span>
              {coach.rating}
              <span className="text-lg text-yellow-500 ml-1">★</span>
            </span>
          </h2>
          <p className="text-gray-600 text-sm mt-2 text-start">{coach.role}</p>
          <p className="text-gray-600 mt-4 text-start">{coach.bio}</p>
          <Button
            className="bg-customGreen text-black py-2 px-4 rounded-lg mt-4"
            onClick={() => alert("Message sent")}
          >
            Book Workout
          </Button>
          <Button
            className=" text-black border-2 border-black py-2 px-4 rounded-lg mt-4"
            onClick={() => alert("Message sent")}
          >
            Repeat Previous Workout
          </Button>
        </div>
      </div>

      <div className=" w-1/3 ">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          className="border-0 rounded-lg  p-4"
          tileClassName={({ date, view }) =>
            `p-2 rounded-md ${
              view === "month" && date.getDay() === 0 ? "text-red-500" : ""
            } ${
              date.toDateString() === new Date().toDateString()
                ? "bg-yellow-100"
                : ""
            }`
          }
          next2Label={null}
          prev2Label={null}
        />
      </div>
      <div className="w-1/3 ">
        {selectedDate && (
          <p className="mt-6 text-black border-b-2 border-borderColor pb-3 text-start">
            {formatDate(selectedDate)}
          </p>
        )}
      </div>
    </div>
  );
};

export default CoachDetail;
