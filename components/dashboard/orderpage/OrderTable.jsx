"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiMenuFries, CiMenuBurger } from "react-icons/ci";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Loading from "@/app/dashboard/loading";
import Pagination from "@/components/global/pagination/Pagination";
import { FaCaretDown } from "react-icons/fa";
import { fetchApi } from "@/utils/FetchApi";
import { useRouter } from "next/navigation";

export default function OrderTable({ AllOrders }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showButton, setShowButton] = useState(true);
  const [showAction, setShowAction] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const data = AllOrders || [];

  const titleData = [
    "All",
    "Received",
    "Confirmed",
    "Dispatched",
    "Delivered",
    "On-Hold",
    "Cancelled",
    "Spammed",
  ];

  const exportPdf = async () => {
    const doc = new jsPDF({ orientation: "landscape" });

    doc.autoTable({
      html: "#my-table",
      headStyles: {
        fillColor: "#F26522",
        textColor: [255, 255, 255],
      },
    });

    doc.save("dataTable.pdf");
  };

  const handleTitleButtonClick = (title) => {
    setSearchQuery(title === "All" ? "" : title);
  };

  const filteredData = data?.filter((item) =>
    Object.values(item).some(
      (value) =>
        value != null &&
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedData = filteredData?.sort((a, b) => {
    if (!sortBy) return 0;
    const aValue = a[sortBy]?.toString().toLowerCase();
    const bValue = b[sortBy]?.toString().toLowerCase();
    return sortDirection === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = sortedData?.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const firstItemIndex = (currentPage - 1) * dataPerPage + 1;
  const lastItemIndex = Math.min(currentPage * dataPerPage, data?.length);
  const totalItems = data?.length;

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
    setSelectedItems(selectAll ? [] : data.map((item) => item._id));
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId]
    );
  };

  const handleDeleteProduct = async () => {
    try {
      for (const itemId of selectedItems) {
        const response = await fetchApi(
          `/order/deleteOrder/${itemId}`,
          "DELETE"
        );
        if (response.status === 200) {
          const newData = data.filter((item) => item._id !== itemId);
          setData(newData);
        } else {
          console.log(`Failed to delete category with ID ${itemId}.`);
        }
      }
      setSelectedItems([]);
      console.log("Selected categories deleted successfully!");
    } catch (err) {
      console.log("An error occurred while deleting selected categories.", err);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      for (const itemId of selectedItems) {
        router.push(`/dashboard/orders/${itemId}`);
      }
    } catch (error) {
      console.log(
        "An error occurred while updating selected categories.",
        error
      );
    }
  };

  function formatDate(dateString) {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    if (isNaN(date)) return "N/A";

    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  }

  return (
    <main>
      {isLoading && <Loading />}

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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              className="peer h-full w-full outline-none text-sm text-gray-500 bg-[#F9FAFB] pr-2 "
              type="text"
              id="search"
              placeholder="Search something.."
            />
          </div>

          <div className="flex justify-between items-center gap-3 w-full">
            <div className="ml-auto border border-[#F9FAFB] bg-[#F9FAFB] rounded-lg shadow-md w-full">
              <button onClick={exportPdf} className="flex mx-auto py-2">
                Export As &#x2193;
              </button>
            </div>
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
                      onClick={handleUpdateProduct}
                      className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 w-full"
                    >
                      Update
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleDeleteProduct}
                      className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 w-full"
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
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
                            <label htmlFor="checkbox-all" className="sr-only">
                              checkbox
                            </label>
                          </div>
                        </th>
                        <th
                          scope="col"
                          onClick={() => handleSort("orderId")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Order &#x21d5;
                        </th>
                        <th
                          scope="col"
                          onClick={() => handleSort("createdAt")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Order time &#x21d5;
                        </th>
                        <th
                          scope="col"
                          onClick={() => handleSort("totalPrice")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Amount &#x21d5;
                        </th>

                        <th
                          scope="col"
                          onClick={() => handleSort("orderStatus")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Status &#x21d5;
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white text-black">
                      {currentData?.map((item) => (
                        <tr
                          key={item._id}
                          className={`${
                            item._id % 2 !== 0 ? "" : "bg-gray-100"
                          } hover:bg-gray-100 duration-700`}
                        >
                          <td scope="col" className="p-4">
                            <div className="flex items-center">
                              <input
                                id={`checkbox_${item._id}`}
                                type="checkbox"
                                className="w-4 h-4  bg-gray-100 rounded border-gray-300"
                                checked={selectedItems.includes(item._id)}
                                onChange={() => handleSelectItem(item._id)}
                              />
                              <label
                                htmlFor={`checkbox_${item._id}`}
                                className="sr-only"
                              >
                                checkbox
                              </label>
                            </div>
                          </td>
                          <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap underline underline-offset-2">
                            <Link href={`/dashboard/orders/${item._id}`}>
                              {item.orderId}
                            </Link>
                          </td>
                          <td className="py-4 text-sm font-medium text-gray-500 whitespace-nowrap ">
                            {formatDate(item.createdAt)}
                          </td>
                          <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                            <span className="text-md">৳</span>
                            {item.totalPrice}
                          </td>

                          <td className="py-4 text-[12px] font-medium  whitespace-nowrap ">
                            <span
                              className={`${
                                item.orderStatus === "Received"
                                  ? "bg-yellow-200 text-yellow-800"
                                  : item.orderStatus === "Confirmed"
                                  ? "bg-blue-200 text-blue-800"
                                  : item.orderStatus === "Delivered"
                                  ? "bg-green-200 text-green-800"
                                  : item.orderStatus === "On-Hold"
                                  ? "bg-red-200 text-red-800"
                                  : item.orderStatus === "Spammed"
                                  ? "bg-red-200 text-red-800"
                                  : item.orderStatus === "Cancelled"
                                  ? "bg-red-200 text-red-800"
                                  : item.orderStatus === "Dispatched"
                                  ? "bg-orange-200 text-orange-600"
                                  : ""
                              } px-2 py-1 rounded-full`}
                            >
                              {item.orderStatus}
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
                          // onClick={() => handleSort("order")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Order
                        </th>
                        <th
                          scope="col"
                          // onClick={() => handleSort("orderTime")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Order time
                        </th>
                        <th
                          scope="col"
                          // onClick={() => handleSort("amount")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Amount
                        </th>

                        <th
                          scope="col"
                          // onClick={() => handleSort("orderStatus")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white text-black">
                      {currentData?.map((item) => (
                        <tr
                          key={item._id}
                          className={`${
                            item._id % 2 !== 0 ? "" : "bg-gray-100"
                          } hover:bg-gray-100 duration-700`}
                        >
                          <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap underline underline-offset-2">
                            <Link href={`/dashboard/orders/${item._id}`}>
                              {item.orderId}
                            </Link>
                          </td>
                          <td className="py-4 text-sm font-medium text-gray-500 whitespace-nowrap ">
                            {formatDate(item.createdAt)}
                          </td>
                          <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                            {item.totalPrice}
                          </td>

                          <td className="py-4 text-[12px] font-medium  whitespace-nowrap ">
                            <span
                              className={`${
                                item.orderStatus === "Received"
                                  ? "bg-yellow-200 text-yellow-800"
                                  : item.orderStatus === "Confirmed"
                                  ? "bg-blue-200 text-blue-800"
                                  : item.orderStatus === "Delivered"
                                  ? "bg-green-200 text-green-800"
                                  : item.orderStatus === "On-Hold"
                                  ? "bg-red-200 text-red-800"
                                  : item.orderStatus === "Spammed"
                                  ? "bg-red-200 text-red-800"
                                  : item.orderStatus === "Cancelled"
                                  ? "bg-red-200 text-red-800"
                                  : item.orderStatus === "Dispatched"
                                  ? "bg-orange-200 text-orange-600"
                                  : ""
                              } px-2 py-1 rounded-full`}
                            >
                              {item.orderStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <Pagination
              currentPage={currentPage}
              dataPerPage={dataPerPage}
              totalItems={sortedData.length}
              paginate={paginate}
              showingText={showingText}
              data={sortedData}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
