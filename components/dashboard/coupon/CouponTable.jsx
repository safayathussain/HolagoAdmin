"use client";
import Link from "next/link";
import { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import PrimaryButton from "@/components/global/primaryButton/PrimaryButton";
import TableTopArea from "@/components/global/table/TableTopArea";
import Pagination from "@/components/global/pagination/Pagination";
import { useRouter } from "next/navigation";
import { formatInternationalDate } from "@/utils/functions";
import Button from "@/components/global/primaryButton/Button";
import ConfirmModal from "@/components/global/modal/ConfirmModal";
import { FetchApi } from "@/utils/FetchApi";

export default function CouponTable({ coupons, setrefetch }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(5);
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [query, setQuery] = useState("code");
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [deleteCouponModal, setdeleteCouponModal] = useState(false);
  const data = coupons;
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
  const handleDeleteCoupon = async () => {
    await FetchApi({
      url: `/discount/api/delete_discount/${selectedCoupon}`,
      method: "delete",
      isToast: true,
      callback: () => {
        setrefetch(Math.random());
        setdeleteCouponModal(false);
      },
    });
  };
  const filters = [
    {
      text: "Coupon Code",
      value: "code",
    },
    {
      text: "Coupon Amount",
      value: "coupon_amount",
    },
    {
      text: "Coupon Limit",
      value: "usage_limit_per_coupon",
    },
  ];
  return (
    <section className="w-full my-5">
      <TableTopArea
        addFunc={() => router.push("/dashboard/addcoupon")}
        addTitle="Add Coupon"
        filters={filters}
        exportPdf={exportPdf}
        selectedItems={selectedItems}
        setQuery={setQuery}
        title="All Coupons"
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
                        onClick={() => handleSort("code")}
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Code &#x21d5;
                      </th>

                      <th
                        scope="col"
                        onClick={() => handleSort("coupon_amount")}
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Amount &#x21d5;
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("minimum_spend")}
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Minimum spend &#x21d5;
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("maximum_spend")}
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Maximum spend &#x21d5;
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("usage_limit_per_coupon")}
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        limit &#x21d5;
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("coupon_expiry_time")}
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        expire date &#x21d5;
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
                          <Link
                            href={`/dashboard/coupon/${item?.id}`}
                            className=" "
                          >
                            {item.code}
                          </Link>
                        </td>

                        <td className="py-4 text-sm font-medium text-gray-500 whitespace-nowrap ">
                          {item.coupon_amount} %
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-500 whitespace-nowrap ">
                          {item.minimum_spend}
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-500 whitespace-nowrap ">
                          {item.maximum_spend}
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-500 whitespace-nowrap ">
                          {item.usage_limit_per_coupon}
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                          {formatInternationalDate(item.coupon_expiry_time)}
                        </td>
                        <td className="py-4 text-sm flex gap-2 font-medium text-gray-500 whitespace-nowrap ">
                          <Button
                            size="sm"
                            onClick={() => {
                              router.push(`/dashboard/coupon/${item?.id}`);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => {
                              setSelectedCoupon(item?.id);
                              setdeleteCouponModal(true);
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
          {/* page footer */}
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
        open={deleteCouponModal}
        setOpen={setdeleteCouponModal}
        onConfirm={handleDeleteCoupon}
        title={"Are you sure to delete this coupon?"}
      />
    </section>
  );
}
