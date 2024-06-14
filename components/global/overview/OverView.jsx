"use client";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

export default function OverView() {
  const [showAction, setShowAction] = useState(false);
  const [actionValue, setActionValue] = useState("Last 30 days");

  return (
    <section className="my-5 bg-white">
      <div className="flex justify-between items-center">
        <h5 className="text-2xl font-bold">Overview</h5>
        <div className="flex justify-between items-center gap-3 ml-auto md:mr-0 relative min-w-36">
          <div className=" bg-[#F9FAFB] rounded-lg shadow-md ">
            <button
              onClick={() => setShowAction(!showAction)}
              className="bg-[#F9FAFB] mx-4 py-2 flex justify-center items-center min-w-36"
            >
              {actionValue} <FaCaretDown className="ml-3" />
            </button>
          </div>
          <div
            onMouseLeave={() => setShowAction(false)}
            className={`
              ${showAction ? "block" : "hidden"}
              absolute top-11 bg-white text-base list-none divide-y divide-gray-100 rounded shadow-md w-full`}
            id="dropdown"
          >
            <ul className="py-1" aria-labelledby="dropdown">
              <li>
                <button
                  onClick={() => setActionValue("Last 7 days")}
                  className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 w-full"
                >
                  Last 7 days
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActionValue("Today")}
                  className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 w-full"
                >
                  Today
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-3 ">
        <div className="bg-[#F9FAFB] p-5 rounded-md hover:bg-[#c8c9c986] shadow-md duration-700">
          <p className="text-[#6B7280] mb-2">Sales This Month</p>
          <div className="flex justify-between items-center">
            <h1 className="text-[30px] font-bold">55689৳</h1>
            <div className="flex justify-center text-green-500 text-md">
              <p className="">+5.6%</p>
              <p className="">&#x2191;</p>
            </div>
          </div>
        </div>
        <div className="bg-[#F9FAFB] p-5 rounded-md hover:bg-[#c8c9c986] shadow-md duration-700">
          <p className="text-[#6B7280] mb-2">Orders today</p>
          <div className="flex justify-between items-center">
            <h1 className="text-[30px] font-bold">84</h1>
            <div className="flex justify-center text-red-500 text-md">
              <p className="">+5.6%</p>
              <p className="">&#x2193;</p>
            </div>
          </div>
        </div>
        <div className="bg-[#F9FAFB] p-5 rounded-md hover:bg-[#c8c9c986] shadow-md duration-700">
          <p className="text-[#6B7280] mb-2">New customers</p>
          <div className="flex justify-between items-center">
            <h1 className="text-[30px] font-bold">56</h1>
            <div className="flex justify-center text-green-500 text-md">
              <p className="">+5.6%</p>
              <p className="">&#x2191;</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
