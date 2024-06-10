"use client";
import Link from "next/link";
import { useState } from "react";
import { CiMenuFries, CiMenuBurger } from "react-icons/ci";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function OrderTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(5);
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showButton, setShowButton] = useState(true);

  const data = [
    {
      id: 1,
      order: "#1789 Md. Mahabub Islam",
      orderTime: "Apr 23 ,2021 13:22:16",
      amount: "43",
      origin: "Google",
      status: "Pending Payment",
      bg: "bg-orange-100",
      text: "text-orange-400",
    },
    {
      id: 2,
      order: "#2789 Islam",
      orderTime: "Apr 23 ,2021 13:22:16",
      amount: "33",
      origin: "Google",
      status: "Processing",
      bg: "bg-purple-100",
      text: "text-purple-400",
    },
    {
      id: 3,
      order: "#7789 Md. Mahabub",
      orderTime: "Apr 23 ,2021 13:22:16",
      amount: "23",
      origin: "Google",
      status: "Completed",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 4,
      order: "#7789 Saiful Islam",
      orderTime: "Apr 23 ,2021 13:22:16",
      amount: "84",
      origin: "Direct",
      status: "Cancelled",
      bg: "bg-red-100",
      text: "text-red-400",
    },
    {
      id: 5,
      order: "#7789 Md. Mahabub Islam",
      orderTime: "Apr 23 ,2021 13:22:16",
      amount: "43",
      origin: "Google",
      status: "Failed",
      bg: "bg-red-100",
      text: "text-red-400",
    },
    {
      id: 6,
      order: "#7789 Md. Mahabub Islam",
      orderTime: "Apr 23 ,2021 13:22:16",
      amount: "43",
      origin: "Google",
      status: "Pending Payment",
      bg: "bg-orange-100",
      text: "text-orange-400",
    },
    {
      id: 7,
      order: "#7789 Md. Islam",
      orderTime: "Apr 23 ,2021 13:22:16",
      amount: "33",
      origin: "Google",
      status: "Processing",
      bg: "bg-purple-100",
      text: "text-purple-400",
    },
    {
      id: 8,
      order: "#7789 Md. Mahabub",
      orderTime: "Apr 23 ,2021 13:22:16",
      amount: "23",
      origin: "Google",
      status: "Completed",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 9,
      order: "#7789 Saiful Islam",
      orderTime: "Apr 23 ,2021 13:22:16",
      amount: "84",
      origin: "Direct",
      status: "Cancelled",
      bg: "bg-red-100",
      text: "text-red-400",
    },
    {
      id: 10,
      order: "#7789 Md. Mahabub Islam",
      orderTime: "Apr 23 ,2021 13:22:16",
      amount: "43",
      origin: "Google",
      status: "Failed",
      bg: "bg-red-100",
      text: "text-red-400",
    },
    {
      id: 11,
      order: "#7789 Md. Mahabub Islam",
      orderTime: "Apr 23 ,2021 13:22:16",
      amount: "43",
      origin: "Google",
      status: "Pending Payment",
      bg: "bg-orange-100",
      text: "text-orange-400",
    },
    {
      id: 12,
      order: "#7789 Md. Islam",
      orderTime: "Apr 23 ,2021 13:22:16",
      amount: "33",
      origin: "Google",
      status: "Processing",
      bg: "bg-purple-100",
      text: "text-purple-400",
    },
    {
      id: 13,
      order: "#7789 Md. Mahabub",
      orderTime: "Apr 23 ,2021 13:22:16",
      amount: "23",
      origin: "Google",
      status: "Completed",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 14,
      order: "#7789 Saiful Islam",
      orderTime: "Apr 23 ,2021 13:22:16",
      amount: "84",
      origin: "Direct",
      status: "Cancelled",
      bg: "bg-red-100",
      text: "text-red-400",
    },
    {
      id: 15,
      order: "#7789 Md. Mahabub Islam",
      orderTime: "Apr 23 ,2021 13:22:16",
      amount: "43",
      origin: "Google",
      status: "Failed",
      bg: "bg-red-100",
      text: "text-red-400",
    },
    {
      id: 16,
      order: "#7789 Md. Mahabub Islam",
      orderTime: "Apr 23 ,2021 13:22:16",
      amount: "43",
      origin: "Google",
      status: "Pending Payment",
      bg: "bg-orange-100",
      text: "text-orange-400",
    },
    {
      id: 17,
      order: "#7789 Md. Islam",
      orderTime: "Apr 23 ,2021 13:22:16",
      amount: "33",
      origin: "Google",
      status: "Processing",
      bg: "bg-purple-100",
      text: "text-purple-400",
    },
    {
      id: 18,
      order: "#7789 Md. Mahabub",
      orderTime: "Apr 23 ,2021 13:22:16",
      amount: "23",
      origin: "Google",
      status: "Completed",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 19,
      order: "#9999 Saiful Islam",
      orderTime: "Apr 23 ,2021 13:22:16",
      amount: "84",
      origin: "Direct",
      status: "Cancelled",
      bg: "bg-red-100",
      text: "text-red-400",
    },
  ];
  const titleData = [
    "All",
    "Pending Payment",
    "Processing",
    "Completed",
    "Cancelled",
    "Failed",
  ];

  // make pdf
  const exportPdf = async () => {
    const doc = new jsPDF({ orientation: "landscape" });

    doc.autoTable({
      html: "#my-table",
      // theme: "grid",
      // styles: {
      //   font: "helvetica",
      //   lineColor: [0, 0, 0],
      //   lineWidth: 0.5,
      // },
      headStyles: {
        fillColor: "#F26522",
        textColor: [255, 255, 255],
      },
    });

    doc.save("dataTable.pdf");
  };

  const handleTitleButtonClick = (title) => {
    if (title === "All") {
      setSearchQuery("");
    } else {
      setSearchQuery(title);
    }
  };

  // Filtered data based on search query
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Sorting function
  const sortedData = filteredData.sort((a, b) => {
    if (!sortBy) return 0;
    if (sortDirection === "asc") {
      return a[sortBy].localeCompare(b[sortBy]);
    } else {
      return b[sortBy].localeCompare(a[sortBy]);
    }
  });

  // Pagination
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = sortedData.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const firstItemIndex = (currentPage - 1) * dataPerPage + 1;
  const lastItemIndex = Math.min(currentPage * dataPerPage, data.length);
  const totalItems = data.length;

  const showingText = `Showing ${firstItemIndex}-${lastItemIndex} of ${totalItems}`;

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };
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
    <main>
      {/* order Top */}
      <div className="grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-y-3 mt-5 border-b-2 pb-5">
        <div className="flex justify-between md:justify-start items-center  w-full">
          <h5 className="text-lg md:text-2xl font-bold">All Orders</h5>
          <button
            onClick={() => setShowButton(!showButton)}
            className="text-sm md:text-lg text-gray-500 block md:hidden"
          >
            {showButton ? (
              <CiMenuFries className="text-xl font-bold" />
            ) : (
              <CiMenuBurger className="text-xl font-bold" />
            )}
          </button>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 ml-auto w-full">
          {/* search bar */}
          <div className="w-full mx-auto">
            <div className="relative flex items-center w-full py-2 rounded-lg focus-within:shadow-lg bg-[#F9FAFB] shadow-md overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    strokeLinejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                className="peer h-full w-full outline-none text-sm text-gray-500 bg-[#F9FAFB] pr-2"
                type="text"
                id="search"
                placeholder="Search something.."
              />
            </div>
          </div>
          <div className="flex justify-between items-center gap-3 w-full">
            <div className="ml-auto border border-[#F9FAFB] bg-[#F9FAFB] rounded-lg shadow-md w-full">
              <button onClick={exportPdf} className="flex mx-auto py-2">
                Export As &#x2193;
              </button>
            </div>
            <div className="mx-auto border border-[#F9FAFB] bg-[#F9FAFB] rounded-lg shadow-md w-full">
              <select className="bg-[#F9FAFB] mx-3 py-2 outline-none ">
                <option className="bg-[#F9FAFB]" value="30">
                  Action
                </option>
                <option className="bg-[#F9FAFB]" value="15">
                  Last 15 Days
                </option>
                <option className="bg-[#F9FAFB]" value="7">
                  Last 07 Days
                </option>
                <option className="bg-[#F9FAFB]" value="1">
                  Last 1 Days
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* button component */}
      <div
        className={`
      ${showButton ? "flex" : "hidden"}
       flex-col md:flex-row gap-2 pb-5 border-b-2 justify-start items-center mt-5 `}
      >
        {titleData.map((title, index) => (
          <button
            key={index}
            onClick={() => handleTitleButtonClick(title)}
            className="bg-gray-100 text-gray-500 px-3 py-2 text-md rounded-md hover:bg-black hover:text-white duration-700 shadow-md w-full"
          >
            {title}
          </button>
        ))}
      </div>

      <section className="w-full my-5">
        {/* table component*/}
        <div className="w-full mx-auto my-5">
          <div className="flex flex-col">
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full table-auto dark:divide-gray-700 overflow-x-scroll">
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
                          onClick={() => handleSort("order")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Order &#x21d5;
                        </th>
                        <th
                          scope="col"
                          onClick={() => handleSort("orderTime")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Order time &#x21d5;
                        </th>
                        <th
                          scope="col"
                          onClick={() => handleSort("amount")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Amount &#x21d5;
                        </th>
                        <th
                          scope="col"
                          onClick={() => handleSort("origin")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Origin &#x21d5;
                        </th>
                        <th
                          scope="col"
                          onClick={() => handleSort("status")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Status &#x21d5;
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white text-black">
                      {currentData?.map((item) => (
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
                            <Link href={`/dashboard/orders/${item.id}`}>
                              {item.order}
                            </Link>
                          </td>
                          <td className="py-4 text-sm font-medium text-gray-500 whitespace-nowrap ">
                            {item.orderTime}
                          </td>
                          <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                            <span className="text-md">৳</span>
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
                  {/* table for pdf */}
                  <table
                    id="my-table"
                    className="min-w-full table-fixed dark:divide-gray-700 hidden"
                  >
                    <thead className="bg-gray-100 ">
                      <tr>
                        <th
                          scope="col"
                          onClick={() => handleSort("order")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Order
                        </th>
                        <th
                          scope="col"
                          onClick={() => handleSort("orderTime")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Order time
                        </th>
                        <th
                          scope="col"
                          onClick={() => handleSort("amount")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Amounts
                        </th>
                        <th
                          scope="col"
                          onClick={() => handleSort("origin")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Origin
                        </th>
                        <th
                          scope="col"
                          onClick={() => handleSort("status")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
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
                          <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap underline underline-offset-2">
                            <Link href={`/dashboard/orders/${item.id}`}>
                              {item.order}
                            </Link>
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

            {/* page footer */}
            <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-y-3 my-10">
              {/* page number */}
              <div className="flex justify-start items-center font-semibold">
                {showingText}
              </div>
              {/* Pagination */}
              <div className="flex justify-end items-center">
                <nav aria-label="Pagination">
                  <ul className="inline-flex border rounded-sm shadow-md">
                    <li>
                      <button
                        className="py-2 px-4 text-gray-700 bg-gray-100 focus:outline-none"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        &#x2190;
                      </button>
                    </li>

                    <li>
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`py-2 px-4  bg-white text-gray-700 hover:bg-gray-100 focus:outline-none `}
                      >
                        {currentPage - 1}
                      </button>
                      <button
                        className={`py-2 px-4 text-gray-700 bg-gray-100 focus:outline-none`}
                      >
                        {currentPage}
                      </button>
                      <button
                        disabled={
                          currentPage === Math.ceil(data.length / dataPerPage)
                        }
                        onClick={() => paginate(currentPage + 1)}
                        className={`py-2 px-4  bg-white text-gray-700 hover:bg-gray-100 focus:outline-none `}
                      >
                        {currentPage + 1}
                      </button>
                      <span
                        className={`py-2 px-4  bg-white text-gray-700 hover:bg-gray-100 focus:outline-none cursor-not-allowed`}
                      >
                        ...
                      </span>
                      <button
                        className={`py-2 px-4  bg-white text-gray-700 hover:bg-gray-100 focus:outline-none `}
                      >
                        {Math.ceil(data.length / dataPerPage)}
                      </button>
                      <button
                        className="py-2 px-4 text-gray-700 bg-gray-100 focus:outline-none"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={
                          currentPage === Math.ceil(data.length / dataPerPage)
                        }
                      >
                        &#x2192;
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
