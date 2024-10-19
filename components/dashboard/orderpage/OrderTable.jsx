"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiMenuFries, CiMenuBurger } from "react-icons/ci";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Loading from "@/app/dashboard/loading";
import Pagination from "@/components/global/pagination/Pagination";
import { FaCaretDown } from "react-icons/fa";
import { useRouter } from "next/navigation";
import TableTopArea from "@/components/global/table/TableTopArea";
import { getOrderStatusClasses, getOrderStatusStyle } from "@/utils/functions";

export default function OrderTable({ AllOrders }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showButton, setShowButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("order_id");
  const [orderType, setOrderType] = useState("all");
  const router = useRouter();

  const data = orderType === 'all' ? AllOrders : AllOrders.filter(item => item.status === orderType);

  const titleData = [
    "All",
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Canceled",
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
    setOrderType(title.toLowerCase())
  };

  const filteredData = data.filter((item) =>
    query
      ? item?.[query]
          ?.toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) === true
      : data
  );

  const sortedData = filteredData?.sort((a, b) => {
    if (!sortBy) return 0;
    const aValue = a[sortBy]?.toString().toLowerCase();
    const bValue = b[sortBy]?.toString().toLowerCase();
    return sortDirection === "asc"
      ? aValue?.localeCompare(bValue)
      : bValue?.localeCompare(aValue);
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
        // const response = await fetchApi(
        //   `/order/deleteOrder/${itemId}`,
        //   "DELETE"
        // );
        // if (response.status === 200) {
        //   const newData = data.filter((item) => item._id !== itemId);
        //   setData(newData);
        // } else {
        //   console.log(`Failed to delete category with ID ${itemId}.`);
        // }
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
  const filters = [
    {
      text: "Order Id",
      value: "order_id",
    },
    {
      text: "Order Status",
      value: "status",
    },
  ];
  return (
    <main>
      {isLoading && <Loading />}
      <TableTopArea
        title="All Orders"
        selectedItems={selectedItems}
        setSearchQuery={setSearchQuery}
        setQuery={setQuery}
        // onUpdate={() => handleUpdateProduct()}
        // onDelete={() => handleDeleteProduct()}
        filters={filters}
      />
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
            className={` ${title.toLowerCase() !== orderType ? 'bg-gray-100' : 'bg-black text-white'} text-gray-500 px-3 py-2 text-md rounded-md hover:bg-black hover:text-white duration-300 shadow-md w-full`}
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
                          onClick={() => handleSort("order_id")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Order &#x21d5;
                        </th>
                        <th
                          scope="col"
                          onClick={() => handleSort("created_at")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Order time &#x21d5;
                        </th>
                        <th
                          scope="col"
                          onClick={() => handleSort("total_price")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Amount &#x21d5;
                        </th>
                        <th
                          scope="col"
                          onClick={() => handleSort("payment_method")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Payment Method &#x21d5;
                        </th>

                        <th
                          scope="col"
                          onClick={() => handleSort("status")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Status &#x21d5;
                        </th>
                        <th
                          scope="col"
                          onClick={() => handleSort("user.name")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Customer Name &#x21d5;
                        </th>
                        <th
                          scope="col"
                          onClick={() => handleSort("user.phone_number")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Customer Phone &#x21d5;
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white text-black">
                      {currentData?.map((item, i) => (
                        <tr
                          key={i}
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
                            <Link href={`/dashboard/orders/${item.order_id}`}>
                              {item.order_id}
                            </Link>
                          </td>
                          <td className="py-4 text-sm font-medium text-gray-500 whitespace-nowrap ">
                            {formatDate(item.created_at)}
                          </td>
                          <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                            <span className="text-md">৳</span>
                            {item.total_price}
                          </td>
                          <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                            {item.payment_method === "digitalPayment"
                              ? "Digital Payment"
                              : "Cash On Delivery"}
                          </td>

                          <td
                            className={`py-4 text-sm font-medium  whitespace-nowrap `}
                          >
                            <span
                              className={` px-2 py-1 rounded-full`}
                              style={getOrderStatusStyle(item?.status)}
                            >
                              {item?.status}
                            </span>
                          </td>
                          <td className="py-4 text-sm font-medium text-gray-500 whitespace-nowrap ">
                            {item?.user?.name}
                          </td>
                          <td className="py-4 text-sm font-medium text-gray-500 whitespace-nowrap ">
                            {item?.user?.phone_number}
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
