import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const calendarStyles = `
  .react-calendar {
    width: 100%;
    max-width: 380px;
    background: #18181b;
    color: #d4d4d8;
    border-radius: 0.75rem;
    box-shadow: 0 6px 24px rgba(0,0,0,0.35);
    border: none;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    padding: 1rem 0.5rem;
  }

  .react-calendar__navigation {
    margin-bottom: 0.5rem;
  }

  .react-calendar__navigation button {
    color: #a5b4fc;
    background: transparent;
    border: none;
    padding: 0.5rem 0.75rem;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 0.5rem;
    transition: background 0.2s, color 0.2s;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #4338ca;
    color: #fff;
  }

  .react-calendar__tile {
    border-radius: 0.5rem;
    padding: 0.75rem 0;
    transition: background-color 0.2s, color 0.2s;
    background: none;
    color: #d4d4d8;
    border: none;
    outline: none;
    position: relative;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #27272a;
    color: #fff;
  }

  .react-calendar__tile--active {
    background: #4338ca;
    color: #fff;
  }

  .react-calendar__tile--now {
    background: #2563eb;
    color: #fff;
  }

  /* Remove red color for weekends */
  .react-calendar__tile--weekend {
    color: #d4d4d8;
  }

  .react-calendar__tile--weekend.react-calendar__tile--active {
    color: #fff;
  }

  .task-dot {
    margin-top: 4px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #3b82f6;
    margin-left: auto;
    margin-right: auto;
  }
`;

const CalendarComponent = ({ selectedDate, onDateSelect, tasks }) => {
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateStr = date.toLocaleDateString("en-CA");
      const hasTask = tasks.some((task) => task.date === dateStr);
      return hasTask ? <div className="task-dot" /> : null;
    }
    return null;
  };

  return (
    <>
      <style>{calendarStyles}</style>
      <Calendar
        onChange={onDateSelect}
        value={selectedDate}
        tileContent={tileContent}
      />
    </>
  );
};

export default CalendarComponent;