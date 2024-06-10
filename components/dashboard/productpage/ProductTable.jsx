"use client";
import Link from "next/link";
import { useState } from "react";
import { CiMenuBurger, CiMenuFries } from "react-icons/ci";
import { FaCaretDown } from "react-icons/fa";
import Pagination from "@/components/global/pagination/Pagination";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/utils/FetchApi";
import Image from "next/image";

export default function ProductTable({ AllProducts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAction, setShowAction] = useState(false);
  const [filter, setFilter] = useState("All");

  const router = useRouter();

  const titleData = ["All", "Published", "Draft"];
  const data = AllProducts || [];

  const noPicture = "https://i.ibb.co/bJXhK7w/3256026-200.png";

  const handleTitleButtonClick = (title) => {
    setFilter(title);
    setSearchQuery("");
  };

  // Filter data based on the filter state
  const filteredData = data
    .filter((item) => {
      if (filter === "Draft") {
        return item.productStatus === "Draft";
      } else if (filter === "Published") {
        return item.productStatus === "Published";
      }
      return true;
    })
    .filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

  const sortData = (filteredData, sortBy, sortDirection) => {
    if (!sortBy) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = sortBy.split(".").reduce((o, i) => (o ? o[i] : ""), a);
      const bValue = sortBy.split(".").reduce((o, i) => (o ? o[i] : ""), b);

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      } else if (aValue instanceof Date && bValue instanceof Date) {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      } else {
        return 0;
      }
    });
  };

  const sortedData = sortData(filteredData, sortBy, sortDirection);

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
    setSelectedItems(selectAll ? [] : [...data.map((item) => item._id)]);
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

  const handleDeleteProduct = async () => {
    try {
      for (const itemId of selectedItems) {
        const response = await fetchApi(
          `/product/deleteProduct/${itemId}`,
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
        router.push(`/dashboard/products/${itemId}`);
      }
    } catch (error) {
      console.log(
        "An error occurred while updating selected categories.",
        error
      );
    }
  };

  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center gap-y-3 mt-5 border-b-2 pb-5">
        <div className="flex justify-between md:justify-start items-center  w-full">
          <h5 className="text-lg md:text-2xl font-bold">All Products</h5>
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
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 ml-auto w-full md:col-span-2">
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
              className="peer h-full w-full outline-none text-sm text-gray-500 bg-[#F9FAFB] pr-2"
              type="text"
              id="search"
              placeholder="Search something.."
            />
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
          <div className="ml-auto md:ml-0 text-white border border-black bg-black rounded-lg shadow-md">
            <Link
              href="/dashboard/addproduct"
              className="flex justify-center items-center px-2 py-1"
            >
              <span className="text-xl font-semibold mr-1">+</span>{" "}
              <span className="text-nowrap">Add Product</span>
            </Link>
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
            className="bg-gray-100 text-gray-500 px-10 py-2 text-md rounded-md hover:bg-black hover:text-white duration-700 shadow-md w-full md:w-auto"
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
                <div className="overflow-hidden ">
                  <table
                    id="joy-bangla"
                    className="min-w-full table-fixed dark:divide-gray-700"
                  >
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
                          onClick={() => handleSort("productName")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Product name &#x21d5;
                        </th>
                        <th
                          scope="col"
                          onClick={() => handleSort("inventory.sku")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          SKU &#x21d5;
                        </th>
                        <th
                          scope="col"
                          onClick={() => handleSort("general.salePrice")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          SalePrice &#x21d5;
                        </th>
                        <th
                          scope="col"
                          onClick={() => handleSort("date")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Published &#x21d5;
                        </th>
                        <th
                          scope="col"
                          onClick={() => handleSort("inventory.stockStatus")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Stock &#x21d5;
                        </th>
                        <th
                          scope="col"
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Available
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white text-black">
                      {currentData?.map((item) => (
                        <tr
                          key={item._id}
                          className={`${
                            item.id % 2 !== 0 ? "" : "bg-gray-100"
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
                          <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                            <Link href={`/dashboard/products/${item._id}`}>
                              <div className="flex justify-start items-center">
                                <Image
                                  className="w-7 h-7 rounded-md"
                                  width={30}
                                  height={30}
                                  src={item?.productImage || noPicture}
                                  alt={item?.productName}
                                />
                                <span className="ml-2">
                                  {item?.productName}
                                </span>
                              </div>
                            </Link>
                          </td>
                          <td className="py-4 text-sm font-medium text-gray-500 whitespace-nowrap ">
                            {item?.inventory?.sku}
                          </td>
                          <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                            <span className="text-md">৳</span>
                            {item?.general?.salePrice}
                          </td>
                          <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                            {item?.date}
                          </td>
                          <td className="py-4 text-[12px] font-medium  whitespace-nowrap ">
                            <span
                              className={`${
                                item?.inventory?.stockStatus === "In Stock"
                                  ? "bg-green-100 text-green-400"
                                  : "bg-red-100 text-red-400"
                              } px-2 py-1 rounded-full`}
                            >
                              {item?.inventory?.stockStatus}
                            </span>
                          </td>
                          <td className="py-4 text-[12px] font-medium  whitespace-nowrap ">
                            <button
                              className={`px-2 py-1 rounded-md border border-black`}
                            >
                              {item?.inventory?.inventoryStatus}
                            </button>
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
