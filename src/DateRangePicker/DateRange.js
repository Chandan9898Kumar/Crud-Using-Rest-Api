import React, { useEffect, useState, memo } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./date.css";
const DateRange = () => {
  const [isDate, setIsDate] = useState(false);

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };
  return (
    <div className="date-container">
      <div className="date-button-container">
        <button className="date-button" onClick={() => setIsDate(!isDate)}>
          {!isDate ? "Select Date" : "Remove Date"}
        </button>
      </div>
      <div className="date-range">{isDate && <DateRangePicker ranges={[selectionRange]} onChange={""} />}</div>
    </div>
  );
};
export default memo(DateRange);
