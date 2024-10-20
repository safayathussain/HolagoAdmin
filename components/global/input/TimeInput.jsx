import React from "react";
import { CustomProvider, DatePicker, TimePicker } from "rsuite";
import 'rsuite/dist/rsuite.min.css';

const TimeInput = ({onChange, value=''}) => {
  return (
    <div>
      <CustomProvider>
        <TimePicker onChange={onChange} value={value}/>
      </CustomProvider>
    </div>
  );
};

export default TimeInput;
