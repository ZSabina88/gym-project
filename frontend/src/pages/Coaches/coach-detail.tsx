import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../features/store";
import Button from "../../shared/Buttons/button";
import "react-calendar/dist/Calendar.css";
import "./calendar-custom.css";
import avatar from "../../assets/Avatar.png";
import { Workout } from "../../features/WorkoutBooking/WorkoutTypes";
import { createWorkout } from "../../features/WorkoutBooking/WorkoutActions";

interface Coach {
  id: string;
  name: string;
  description: string;
  activity: string;
  target: string;
  status: string;
  rating: number;
  avatar: string;
  role: string;
  bio: string;
}

const CoachDetail: React.FC = () => {
  const { state } = useLocation();
  const coach = state?.coach as Coach;

  const dispatch = useDispatch<AppDispatch>();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const availableTimes = [
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
  ];

  if (!coach) {
    return <p>Coach not found</p>;
  }

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeChange = (time: string) => {
    const startTime = time.split(" - ")[0].split(":")[0];
    setSelectedTime(startTime);
    console.log(selectedTime);
  };

  const formatDate = (date: Date) => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    });
    return formatter.format(date);
  };

  const handleSubmit = async () => {
    if (selectedDate && selectedTime) {
      const formattedDate = selectedDate.toISOString().split("T")[0];

      const workoutData: Omit<Workout, "id"> = {
        coachId: coach.id,
        clientId: "123",
        timeSlot: {
          date: formattedDate,
          startTime: selectedTime,
        },
        status: "booked",
        feedback: "",
      };

      try {
        await dispatch(createWorkout(workoutData));
        alert(`Workout booked for ${formattedDate}, ${selectedTime}`);
      } catch (error) {
        alert("Failed to book workout");
      }
    } else {
      alert("Please select both a date and time.");
    }
  };

  return (
    <div className="p-8 flex">
      <div className="w-1/3 flex flex-col">
        <div className="w-[320px] flex flex-col">
          <img
            src={coach.avatar || avatar}
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
            onClick={handleSubmit}
          >
            Book Workout
          </Button>
          <Button
            className="text-black border-2 border-black py-2 px-4 rounded-lg mt-4"
            onClick={() => alert("Message sent")}
          >
            Repeat Previous Workout
          </Button>
        </div>
      </div>

      <div className="w-1/3">
        <Calendar
          onChange={(value) =>
            handleDateChange(value instanceof Date ? value : null)
          }
          value={selectedDate}
          className="border-0 rounded-lg p-4"
        />
      </div>

      <div className="w-1/3">
        {selectedDate && (
          <div>
            <div className="mt-6 text-black border-b-2 border-borderColor pb-3 text-start">
              <p>{formatDate(selectedDate)}</p>
            </div>
            <div className="mt-6 text-black pb-3 text-start">
              <div className="mt-4">
                <div className="flex flex-col mt-2 space-y-2">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      className={`py-2 px-4 bg-creamColor border rounded-md ${
                        selectedTime === time.split(" - ")[0].split(":")[0]
                          ? "bg-customGreen text-black border-2 border-customGreen"
                          : "bg-white border-gray-300 text-black"
                      }`}
                      onClick={() => handleTimeChange(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoachDetail;
