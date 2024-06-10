"use client";
import React, { useState } from "react";

const CustomTimePicker = () => {
  const [selectedTime, setSelectedTime] = useState(null);

  // Function to handle time selection
  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  // Generate an array of time options in 12-hour format with AM/PM
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 1; hour <= 12; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const hour12 = hour === 12 ? 12 : hour % 12;
        const period = hour >= 12 ? "PM" : "AM";
        const time = `${hour12}:${minute
          .toString()
          .padStart(2, "0")} ${period}`;
        options.push(time);
      }
    }
    return options;
  };

  return (
    <div className="custom-time-picker w-full">
      <div className="flex justify-between items-center gap-5">
        <h2 className="font-semibold text-[#f26522]">Select a Time</h2>
        {selectedTime && (
          <p className="selected-time">Selected Time: {selectedTime}</p>
        )}
      </div>

      <div id="time_option" className="time-options">
        {generateTimeOptions().map((time) => (
          <div
            key={time}
            className={`time-option ${selectedTime === time ? "selected" : ""}`}
            
            onClick={() => handleTimeClick(time)}
          >
            {time}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomTimePicker;
