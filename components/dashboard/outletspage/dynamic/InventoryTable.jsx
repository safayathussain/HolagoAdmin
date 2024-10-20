"use client";
import Link from "next/link";
import { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import TextInput from "@/components/global/input/TextInput";

export default function InventoryTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(5); // data per page
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const data = [
    {
      id: 1,
      productName: "HItaci Ac 2 Ton",
      sku: "FAN-CON-695",
      price: "1586",
      published: "18 may 2024",
      stock: "In Stock",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 2,
      productName: "Sharp Washing machine",
      sku: "FAN-CON-1542",
      price: "985",
      published: "18 may 2024",
      stock: "In Stock",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 3,
      productName: "LG LED Tv 40 inch",
      sku: "FAN-CON-8457",
      price: "4895",
      published: "18 may 2024",
      stock: "In Stock",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 4,
      productName: "Conion LED Tv 33 inch",
      sku: "FAN-CON-1542",
      price: "6951",
      published: "22 jan 2024",
      stock: "Out of Stock",
      bg: "bg-red-100",
      text: "text-red-400",
    },
    {
      id: 5,
      productName: "HItaci Ac 2 Ton",
      sku: "FAN-CON-1542",
      price: "1586",
      published: "18 may 2024",
      stock: "Out of Stock",
      bg: "bg-red-100",
      text: "text-red-400",
    },
    {
      id: 6,
      productName: "HItaci Ac 2 Ton",
      sku: "FAN-CON-0184",
      price: "1586",
      published: "18 may 2024",
      stock: "In Stock",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 7,
      productName: "LG LED Tv 40 inch",
      sku: "FAN-CON-1542",
      price: "985",
      published: "18 may 2024",
      stock: "In Stock",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 8,
      productName: "LG LED Tv 40 inch",
      sku: "FAN-CON-1542",
      price: "4895",
      published: "18 may 2024",
      stock: "In Stock",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 9,
      productName: "Conion LED Tv 33 inch",
      sku: "FAN-CON-1542",
      price: "6951",
      published: "22 jan 2024",
      stock: "Out of Stock",
      bg: "bg-red-100",
      text: "text-red-400",
    },
    {
      id: 10,
      productName: "HItaci Ac 2 Ton",
      sku: "FAN-CON-1542",
      price: "1586",
      published: "18 may 2024",
      stock: "Out of Stock",
      bg: "bg-red-100",
      text: "text-red-400",
    },
    {
      id: 11,
      productName: "HItaci Ac 2 Ton",
      sku: "FAN-CON-1542",
      price: "1586",
      published: "18 may 2024",
      stock: "In Stock",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 12,
      productName: "LG LED Tv 40 inch",
      sku: "FAN-CON-1542",
      price: "985",
      published: "18 may 2024",
      stock: "In Stock",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 13,
      productName: "LG LED Tv 40 inch",
      sku: "FAN-CON-1542",
      price: "4895",
      published: "18 may 2024",
      stock: "In Stock",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 14,
      productName: "Conion LED Tv 33 inch",
      sku: "FAN-CON-1542",
      price: "6951",
      published: "22 jan 2024",
      stock: "Out of Stock",
      bg: "bg-red-100",
      text: "text-red-400",
    },
    {
      id: 15,
      productName: "HItaci Ac 2 Ton",
      sku: "FAN-CON-1542",
      price: "1586",
      published: "18 may 2024",
      stock: "Out of Stock",
      bg: "bg-red-100",
      text: "text-red-400",
    },
    {
      id: 16,
      productName: "HItaci Ac 2 Ton",
      sku: "FAN-CON-1542",
      price: "1586",
      published: "18 may 2024",
      stock: "In Stock",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 17,
      productName: "LG LED Tv 40 inch",
      sku: "FAN-CON-1542",
      price: "985",
      published: "18 may 2024",
      stock: "In Stock",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 18,
      productName: "LG LED Tv 40 inch",
      sku: "FAN-CON-1542",
      price: "4895",
      published: "18 may 2024",
      stock: "In Stock",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 19,
      productName: "Conion LED Tv 33 inch",
      sku: "FAN-CON-1542",
      price: "6951",
      published: "22 jan 2024",
      stock: "Out of Stock",
      bg: "bg-red-100",
      text: "text-red-400",
    },
  ];
  // Sorting function
  const sortedData = data.sort((a, b) => {
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
  // make pdf
  const exportPdf = async () => {
    const doc = new jsPDF({ orientation: "landscape" });

    doc.autoTable({
      html: "#joy-bangla",
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
  return (
    <section className="w-full my-5">
    
      <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center gap-y-3 mt-5 border-b-2 pb-5">
        <div className="flex justify-between md:justify-start items-center w-full">
          <h5 className="text-lg md:text-2xl font-bold">Inventory</h5>
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

            <TextInput
              onChange={(e) => setSearchQuery(e.target.value)}
              className="peer h-full w-full outline-none text-sm text-gray-500 bg-[#F9FAFB] pr-2"
              type="text"
              id="search"
              placeholder="Search something.."
            />
          </div>
          <div className="flex justify-between items-center gap-3 w-full">
            <div className="ml-auto border border-[#F9FAFB] bg-[#F9FAFB] rounded-lg shadow-md w-full">
              <button
                onClick={exportPdf}
                className="flex mx-auto py-2 text-nowrap px-3"
              >
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
          <div className="ml-auto border border-[#F9FAFB] bg-[#F9FAFB] rounded-lg shadow-md">
            <select className="bg-[#F9FAFB] mx-3 py-2 outline-none">
              <option className="bg-[#F9FAFB]" value="30">
                Filter with
              </option>
              <option className="bg-[#F9FAFB]" value="15">
                Outlets Name
              </option>
              <option className="bg-[#F9FAFB]" value="7">
                Outlets City
              </option>
              <option className="bg-[#F9FAFB]" value="1">
                Outlets Address
              </option>
            </select>
          </div>
        </div>
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
                        onClick={() => handleSort("sku")}
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        SKU &#x21d5;
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("price")}
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Price &#x21d5;
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("published")}
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Published &#x21d5;
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("stock")}
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Stock &#x21d5;
                      </th>
                      <th
                        scope="col"
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Action
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
                        <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                          <Link href={`/dashboard/outlets/${item.id}`}>
                            <div className="flex justify-start items-center">
                              <img
                                className="w-7 h-7 rounded-md"
                                src="https://i.ibb.co/jVPhV6Q/diego-gonzalez-I8l-Durtf-Ao-unsplash.jpg"
                                alt=""
                              />
                              <span className="ml-2">{item.productName}</span>
                            </div>
                          </Link>
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-500 whitespace-nowrap ">
                          {item.sku}
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                          <span className="text-md">৳</span>
                          {item.price}
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                          {item.published}
                        </td>
                        <td className="py-4 text-[12px] font-medium  whitespace-nowrap ">
                          <span
                            className={`${item.bg} ${item.text} px-2 py-1 rounded-full`}
                          >
                            {item.stock}
                          </span>
                        </td>
                        <td className="py-4 text-[12px] font-medium  whitespace-nowrap ">
                          <button
                            className={` px-2 py-1 rounded-md border border-black`}
                          >
                            View Details
                          </button>
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
  );
}
