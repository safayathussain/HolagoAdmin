import { formatNumberInK } from "@/utils/functions";
import React from "react";
import { Progress } from "rsuite";
import 'rsuite/dist/rsuite.min.css';

const LocationData = ({ sales_by_city }) => {
  return (
    <div className="mt-3">
      <div>
        <div className="border rounded-lg p-5 w-1/2">
          <p>Sales By Location</p>

          {sales_by_city?.map((item, i) => (
            <div key={i}>
              <p className="font-bold leading-none mt-3">{item?.city}</p>
              <p className=" leading-none mt-3">{formatNumberInK(item?.total_sales)}</p>
              <Progress.Line strokeColor="#B2B50C" className="-ml-2.5" percent={item?.sales_percentage}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationData;
