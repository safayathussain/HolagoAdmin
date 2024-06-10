"use client";
import { useState } from "react";

export default function DashboardTable() {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const data = [
    {
      id: 1,
      order: "#7789 Md. Mahabub Islam",
      orderTime: "Apr 23 ,2021 13:22:16",
      amount: "43৳",
      origin: "Google",
      status: "Pending Payment",
      bg: "bg-orange-100",
      text: "text-orange-400",
    },
    {
      id: 2,
      order: "#7789 Md. Islam",
      orderTime: "Apr 23 ,2021 13:22:16",
      amount: "33৳",
      origin: "Google",
      status: "Processing",
      bg: "bg-purple-100",
      text: "text-purple-400",
    },
    {
      id: 3,
      order: "#7789 Md. Mahabub",
      orderTime: "Apr 23 ,2021 13:22:16",
      amount: "23৳",
      origin: "Google",
      status: "Completed",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 4,
      order: "#7789 Saiful Islam",
      orderTime: "Apr 23 ,2021 13:22:16",
      amount: "84৳",
      origin: "Direct",
      status: "Cancelled",
      bg: "bg-red-100",
      text: "text-red-400",
    },
    {
      id: 5,
      order: "#7789 Md. Mahabub Islam",
      orderTime: "Apr 23 ,2021 13:22:16",
      amount: "43৳",
      origin: "Google",
      status: "Failed",
      bg: "bg-red-100",
      text: "text-red-400",
    },
  ];

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems(selectAll ? [] : [...data.map((item) => item.id)]);
  };

  const handleSelectItem = (itemId) => {
    const selectedIndex = selectedItems.indexOf(itemId);
    if (selectedIndex === -1) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems([
        ...selectedItems.slice(0, selectedIndex),
        ...selectedItems.slice(selectedIndex + 1),
      ]);
    }
  };
  return (
    <section className="mb-10">
      <div className="flex justify-between items-center">
        <h5 className="text-2xl font-bold">Recent Orders</h5>
        <button className="text-md font-bold">ViewAll</button>
      </div>

      {/* table component*/}
      <div className="w-full mx-auto my-5">
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full table-fixed dark:divide-gray-700">
                  {/* table head */}
                  <thead className="bg-gray-100 ">
                    <tr>
                      <th scope="col" className="p-4 w-6">
                        <div className="flex items-center">
                          <input
                            id="checkbox_all"
                            type="checkbox"
                            className="w-4 h-4 bg-gray-100 rounded border-gray-300 "
                            onChange={handleSelectAll}
                            checked={selectAll}
                          />
                          <label for="checkbox-all" className="sr-only">
                            checkbox
                          </label>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Order
                      </th>
                      <th
                        scope="col"
                        className="py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Order time
                      </th>
                      <th
                        scope="col"
                        className="py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Origin
                      </th>
                      <th
                        scope="col"
                        className="py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-black">
                    {data?.map((item) => (
                      <tr
                        key={item.id}
                        className={`${
                          item.id % 2 !== 0 ? "" : "bg-gray-100"
                        } hover:bg-gray-100 duration-700`}
                      >
                        <td scope="col" className="p-4">
                          <div className="flex items-center">
                            <input
                              id={`checkbox_${item.id}`}
                              type="checkbox"
                              className="w-4 h-4  bg-gray-100 rounded border-gray-300"
                              checked={selectedItems.includes(item.id)}
                              onChange={() => handleSelectItem(item.id)}
                            />
                            <label
                              htmlFor={`checkbox_${item.id}`}
                              className="sr-only"
                            >
                              checkbox
                            </label>
                          </div>
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap underline underline-offset-2">
                          {item.order}
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-500 whitespace-nowrap ">
                          {item.orderTime}
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                          {item.amount}
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                          {item.origin}
                        </td>
                        <td className="py-4 text-[12px] font-medium  whitespace-nowrap ">
                          <span
                            className={`${item.bg} ${item.text} px-2 py-1 rounded-full`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
