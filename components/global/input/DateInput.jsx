import React from "react";
import { CustomProvider, DatePicker } from "rsuite";
import 'rsuite/dist/rsuite.min.css';

const DateInput = () => {
  return (
    <div>
      <CustomProvider>
        <DatePicker />
      </CustomProvider>
    </div>
  );
};

export default DateInput;
