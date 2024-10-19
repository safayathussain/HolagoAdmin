import React from "react";
import { CustomProvider, DatePicker, TimePicker } from "rsuite";
import 'rsuite/dist/rsuite.min.css';

const TimeInput = () => {
  return (
    <div>
      <CustomProvider>
        <TimePicker />
      </CustomProvider>
    </div>
  );
};

export default TimeInput;
