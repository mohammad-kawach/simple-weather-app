import React from "react";

interface CustomCalendarProps {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    console.log("Selected date:", newDate);
  };

  return (
    <input
      type="date"
      className="form-control"
      value={selectedDate}
      onChange={handleDateChange}
    />
  );
};

export default CustomCalendar;
