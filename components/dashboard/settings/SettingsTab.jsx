"use client";

import { useState } from "react";

export default function SettingTab({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="">
      <div className="flex gap-x-2 my-5">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${
              index === activeTab
                ? "border-gray-500 text-black"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } flex items-center py-2 px-4 border-b-2 text-center font-medium focus:outline-none bg-gray-100 w-full rounded-md `}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs[activeTab].content}</div>
    </div>
  );
}
