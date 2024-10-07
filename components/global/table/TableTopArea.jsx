"use client";
import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import PrimaryButton from "../primaryButton/PrimaryButton";
import toast from "react-hot-toast";
import { isEmptyArrowFunction } from "@/utils/functions";

const TableTopArea = ({
  title = "",
  setSearchQuery = () => {},
  exportPdf = () => {},
  selectedItems = [],
  filters = [],
  addTitle = "Add",
  addFunc = () => {},
  onUpdate = () => {},
  onDelete = () => {},
  setQuery = () => {},
}) => {
  const [showAction, setShowAction] = useState(false);
  console.log(isEmptyArrowFunction(onDelete));
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center gap-y-3 mt-5 border-b-2 pb-5">
        <div className="flex justify-between md:justify-start items-center w-full">
          <h5 className="text-lg md:text-2xl font-bold">{title}</h5>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 ml-auto w-full md:col-span-2">
          <div className="ml-auto border border-[#F9FAFB] bg-[#F9FAFB] rounded-lg shadow-md">
            <select
              onChange={(e) => setQuery(e.target.value)}
              className="bg-[#F9FAFB] mx-3 py-2 outline-none"
            >
              <option className="bg-[#F9FAFB]" value={""}>
                Filter with
              </option>
              {filters.map((item, i) => (
                <option key={i} className="bg-[#F9FAFB]" value={item.value}>
                  {item.text}
                </option>
              ))}
            </select>
          </div>
          {/* search bar */}
          <div className="relative flex items-center py-2 rounded-lg focus-within:shadow-lg bg-[#F9FAFB] shadow-md overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              className="peer h-full outline-none w-64 text-sm text-gray-500 bg-[#F9FAFB] pr-2"
              type="text"
              id="search"
              placeholder="Search something.."
            />
          </div>
          <div className="flex justify-between items-center gap-3 ">
            <div className="ml-auto border border-[#F9FAFB] bg-[#F9FAFB] rounded-lg shadow-md ">
              <button
                onClick={exportPdf}
                className="flex mx-auto py-2 text-nowrap px-3"
              >
                Export As &#x2193;
              </button>
            </div>
            {!isEmptyArrowFunction(onDelete) &&
              !isEmptyArrowFunction(onUpdate) && (
                <div className="flex justify-between items-center gap-3 mr-auto md:mr-0 relative">
                  <div className=" bg-[#F9FAFB] rounded-lg shadow-md ">
                    <button
                      onClick={() => setShowAction(!showAction)}
                      className="bg-[#F9FAFB] mx-4 py-2 flex justify-center items-center"
                    >
                      Action <FaCaretDown className="ml-3" />
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
                          onClick={() => {
                            selectedItems.length === 0
                              ? toast.error("0 Category selected")
                              : onUpdate();
                          }}
                          className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 w-full"
                        >
                          Update
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            selectedItems.length === 0
                              ? toast.error("0 Category selected")
                              : onDelete();
                          }}
                          className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 w-full"
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            {addTitle !== "Add" && (
              <div>
                <div className="ml-auto md:ml-0 text-white border border-black bg-black rounded-lg shadow-md">
                  <button
                    onClick={addFunc}
                    className="flex justify-center items-center px-2 py-1"
                  >
                    <span className="text-xl font-semibold mr-1">+</span>{" "}
                    <span className="text-nowrap">{addTitle}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableTopArea;
