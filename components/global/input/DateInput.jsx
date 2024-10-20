import React from "react";
import { CustomProvider, DatePicker } from "rsuite";
import 'rsuite/dist/rsuite.min.css';

const DateInput = ({onChange, value='', ...etc}) => {
  return (
    <div>
      <CustomProvider>
        <DatePicker onChange={onChange} value={value} {...etc} />
      </CustomProvider>
    </div>
  );
};

export default DateInput;
