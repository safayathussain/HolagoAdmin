import React from "react";
import { CustomProvider, DatePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const DateInput = ({ onChange, label, value = "", ...etc }) => {
  return (
    <div className="flex flex-col ">
      <label htmlFor="">{label}</label>
      <CustomProvider>
        <DatePicker onChange={onChange} value={value} {...etc} />
      </CustomProvider>
    </div>
  );
};

export default DateInput;
