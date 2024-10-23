"use client";

import LocationData from "./LocationData";
import SalesGraph from "./salesGraph";

export default function OverView({ data }) {
  return (
    <section className="my-5 bg-white">
      <div className="flex justify-between items-center">
        <h5 className="text-2xl font-bold">Overview</h5>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-3 ">
        <div className="bg-[#F9FAFB] p-5 rounded-lg hover:bg-[#c8c9c986] border duration-700">
          <p className="text-[#6B7280] mb-2">Sales This Month</p>
          <div className="flex justify-between items-center">
            <h1 className="text-[30px] font-bold">
              {data?.sales_this_month} ৳
            </h1>
            <div className="flex justify-center text-green-500 text-md">
              <p className="">{data?.growth_percentage}%</p>
              <p className="">&#x2191;</p>
            </div>
          </div>
        </div>
        <div className="bg-[#F9FAFB] p-5 rounded-lg hover:bg-[#c8c9c986] border duration-700">
          <p className="text-[#6B7280] mb-2">Orders today</p>
          <div className="flex justify-between items-center">
            <h1 className="text-[30px] font-bold">{data?.orders_today}</h1>
          </div>
        </div>
        <div className="bg-[#F9FAFB] p-5 rounded-lg hover:bg-[#c8c9c986] border duration-700">
          <p className="text-[#6B7280] mb-2">New customers</p>
          <div className="flex justify-between items-center">
            <h1 className="text-[30px] font-bold">{data?.new_customers}</h1>
          </div>
        </div>
      </div>
      <SalesGraph/>
      <LocationData sales_by_city={data?.sales_by_city}/>
    </section>
  );
}
