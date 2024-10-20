"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { FaCaretDown } from "react-icons/fa";
import TableTopArea from "@/components/global/table/TableTopArea";
import { useRouter } from "next/navigation";
import { FetchApi } from "@/utils/FetchApi";
import Pagination from "@/components/global/pagination/Pagination";
import Button from "@/components/global/primaryButton/Button";
import ConfirmModal from "@/components/global/modal/ConfirmModal";

export default function OutletsTable({ data, setrefetch }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(5); // Change this value to adjust the number of rows per page
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [query, setquery] = useState("outletName");
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteOutletModal, setdeleteOutletModal] = useState(false)
  const [selectedOutlet, setselectedOutlet] = useState(null)
  const router = useRouter();
  const filteredData = data.filter((item) =>
    query
      ? item?.[query]
          ?.toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) === true
      : data
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
  const filters = [
    {
      text: "Outlet Name",
      value: "outletName",
    },
    {
      text: "Outlet Location",
      value: "location",
    },
    {
      text: "Outlet Phone",
      value: "manager.phone_number",
    },
  ];
  const handleDeleteOutlet = async() => {
    await FetchApi({
      url: `/outlet/api/delete-outlet/${selectedOutlet}`,
      method: "delete",
      isToast:true,
      callback: () => {
        setrefetch(Math.random());
        setdeleteOutletModal(false)
      },
    });
  }
  return (
    <section className="w-full my-5">
      <TableTopArea
        addTitle="Add Outlet"
        addFunc={() => router.push("/dashboard/outlets/add")}
        selectedItems={selectedItems}
        title="All Outlets"
        exportPdf={exportPdf}
        filters={filters}
        setQuery={setquery}
        setSearchQuery={setSearchQuery}
      />

      {/* table component*/}
      <div className="w-full mx-auto my-5">
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full dark:divide-gray-700">
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
                        onClick={() => handleSort("outletName")}
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Outlet Name &#x21d5;
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("location")}
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Address &#x21d5;
                      </th>

                      <th
                        scope="col"
                        onClick={() => handleSort("phone_number")}
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Phone Number &#x21d5;
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
                              <span className="ml-2">{item.outletName}</span>
                            </div>
                          </Link>
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-500 whitespace-nowrap ">
                          {item.location}
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                          {item.manager_details?.phone_number}
                        </td>

                        <td className="py-4 text-sm flex gap-2 font-medium text-gray-500 whitespace-nowrap ">
                          <Button
                            size="sm"
                            onClick={() => {
                              router.push(`/dashboard/outlets/${item?.id}`);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => {
                              setselectedOutlet(item?.id);
                              setdeleteOutletModal(true);
                            }}
                            size="sm"
                            className="bg-error"
                          >
                            Delete
                          </Button>
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
            paginate={paginate}
            showingText={showingText}
            totalItems={totalItems}
          />
        </div>
      </div>
      <ConfirmModal
        open={deleteOutletModal}
        setOpen={setdeleteOutletModal}
        onConfirm={handleDeleteOutlet}
        title={"Are you sure to delete this outlet?"}
      />
    </section>
  );
}
