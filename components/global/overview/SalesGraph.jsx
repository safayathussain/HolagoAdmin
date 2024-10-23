import React from "react";
import DateInput from "../input/DateInput";

const SalesGraph = () => {
  return (
    <div className="p-5 rounded-md border flex">
      <div className="flex flex-col justify-between gap-7">
        <div className="space-y-2">
          <p className="text-lg font-semibold mb-5">Filter data</p>
          <DateInput label={"From"} />
          <DateInput label={"To"} />
        </div>
        <div>
          <p className="text-lg font-semibold">Total Sale</p>
          <p className="text-sm text-gray-500 leading-none">22 Dec - 28 Dec</p>
          <p className="text-2xl font-bold">৳ 31,868</p>
        </div>
      </div>
      <div>
{/* graph here */}
      </div>
    </div>
  );
};

export default SalesGraph;
