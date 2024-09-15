"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import Modal from "@/components/global/modal/Modal";
import Pagination from "@/components/global/pagination/Pagination";
import { FetchApi, fetchApi } from "@/utils/FetchApi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/functions";
import { store } from "@/redux/store";
import useClickOutside from "@/utils/useClickOutside";
import ConfirmModal from "@/components/global/modal/ConfirmModal";
import toast from "react-hot-toast";

export default function CategoriesTable({ AllCategories, refetch }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAction, setShowAction] = useState(false);
  const [CategoryImage, setCategoryImage] = useState(null)
  const [deleteCatModal, setdeleteCatModal] = useState(false)
  const data = AllCategories || [];

  const router = useRouter();
  const { auth } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");


    const userId = auth ? auth.id : "";
    const categoryName = e.target.categoriesName.value;
    const parentCategoryId = e.target.parentCategoryId.value;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('categoryName', categoryName);
      formData.append('parentCategory', parentCategoryId);
      formData.append('coverImage', CategoryImage);
      const response = await FetchApi({ url: "/category/api/addCategory", method: "post", body: formData, isToast: true });

      // setIsLoading(false);

      if (response) {
        setMessage("Category added successfully!");
        refetch(Math.random())
        setShowMenu(false)
      } else {
        setError("Failed to add category. Please try again.");
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err)
      setError("An error occurred while adding the category.");
    }
  };

  const handleDeleteCategory = async () => {
    try {
      for (const itemId of selectedItems) {
        const { data } = await FetchApi({ url: `/category/api/delete-category/${itemId}` , method: 'delete'})
        console.log(data)
      }
      setSelectedItems([]);
      console.log("Selected categories deleted successfully!");
    } catch (err) {
      console.log("An error occurred while deleting selected categories.", err);
    }
  };
  // console.log(selectedItems)
  const handleUpdateCategory = async () => {
    try {
      selectedItems.forEach((itemId, index) => {
        setTimeout(() => {
          window.open(`/dashboard/products/categories/${itemId}`, '_blank');
        }, index * 1500); // 500 ms delay between opening tabs
      });
    } catch (error) {
      console.log(
        "An error occurred while updating selected categories.",
        error
      );
    }
  };

  // Filtered data based on search query
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
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
    setSelectedItems(selectAll ? [] : [...AllCategories?.map((item) => item.id)]);
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
  const handleCategoryFileChange = async (event) => {
    const file = event.target.files[0];
    setIsLoading(true);

    try {
      // const uploadedImageUrl = await handleUpload(file);
      setCategoryImage(file);
      setIsLoading(false);
      // console.log(uploadedImageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsLoading(false);
    }
  };
  const menuref = useRef();
  useClickOutside(menuref, () => {
    setShowMenu(false)
  })
  return (
    <section className="w-full my-5">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center gap-y-3 mt-5 border-b-2 pb-5">
          <div className="flex justify-between md:justify-start items-center w-full">
            <h5 className="text-lg md:text-2xl font-bold">All Categories</h5>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 ml-auto w-full md:col-span-2">
            <div className="relative flex items-center md:min-w-max w-full py-2 rounded-lg focus-within:shadow-lg bg-[#F9FAFB] shadow-md overflow-hidden">
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
                      onClick={() => {
                        selectedItems.length === 0 ? toast.error('0 Category selected') :
                          handleUpdateCategory()
                      }}
                      className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 w-full"
                    >
                      Update
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        selectedItems.length === 0 ? toast.error('0 Category selected') :
                          setdeleteCatModal(true)
                      }}
                      className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 w-full"
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="ml-auto md:ml-0 text-white border border-black bg-black rounded-lg shadow-md">
              <button
                onClick={() => setShowMenu(true)}
                className="flex justify-center items-center px-2 py-1"
              >
                <span className="text-xl font-semibold mr-1">+</span>{" "}
                <span className="text-nowrap">Add Categories</span>
              </button>
            </div>
          </div>
        </div>

        <div className="w-full mx-auto my-5">
          <div className="flex flex-col">
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden ">
                  <table className="min-w-full  dark:divide-gray-700">
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
                          onClick={() => handleSort("categoryName")}
                          className="py-3 text-sm font-medium text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          categories &#x21d5;
                        </th>
                        <th
                          scope="col"
                          onClick={() => handleSort("slug")}
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Slug &#x21d5;
                        </th>
                        <th
                          scope="col"
                          className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                        >
                          Count
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white text-black">
                      {currentData?.map((item) => (
                        <tr
                          key={item?.id}
                          className={`${item.id % 2 !== 0 ? "" : "bg-gray-100"
                            } hover:bg-gray-100 duration-700`}
                        >
                          <td scope="col" className="p-4">
                            <div className="flex items-center">
                              <input
                                id={`checkbox_${item?._id}`}
                                type="checkbox"
                                className="w-4 h-4  bg-gray-100 rounded border-gray-300"
                                checked={selectedItems.includes(item?.id)}
                                onChange={() => handleSelectItem(item?.id)}
                              />
                              <label
                                htmlFor={`checkbox_${item?._id}`}
                                className="sr-only"
                              >
                                checkbox
                              </label>
                            </div>
                          </td>
                          <td className="py-4 text-sm font-medium text-gray-900 ">
                            <Link
                              href={`/dashboard/products/categories/${item.id}`}
                            >
                              {item.categoryName}
                            </Link>
                          </td>
                          <td className="py-4 text-sm font-medium text-gray-500 whitespace-nowrap ">
                            {item.slug}
                          </td>
                          <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                            {item.productCount}
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
              totalItems={sortedData.length}
              paginate={paginate}
              showingText={showingText}
              data={sortedData}
            />
          </div>
        </div>
        {/* modal */}
        <Modal open={showMenu}>
          <div
            ref={menuref}
            id="menu"
          >
            <div className="flex justify-center items-center">
              <div className="max-w-[565px] lg:min-w-[565px] md:w-auto relative flex flex-col justify-center items-center bg-white rounded-md">
                <div className="flex justify-between items-center w-full">
                  <span className="text-3xl font-bold">Add Categories</span>
                  <button
                    onClick={() => setShowMenu(false)}
                    className="text-gray-400  focus:outline-none"
                    aria-label="close"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 6L6 18"
                        stroke="currentColor"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 6L18 18"
                        stroke="currentColor"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="w-full mt-10">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2 ">
                      <div className="flex flex-col w-full ">
                        {CategoryImage && (
                          <img
                            src={URL.createObjectURL(CategoryImage)}
                            alt="Uploaded"
                            className=" max-h-[300px] object-contain rounded-md"
                          />
                        )}

                        {!CategoryImage && (
                          <div>
                            <input
                              type="file"
                              id="featuredImageUpload"
                              className="hidden"
                              accept="image/*"
                              onChange={handleCategoryFileChange}
                            />
                            <label
                              htmlFor="featuredImageUpload"
                              className="z-20 flex flex-col-reverse items-center justify-center w-full h-[200px] cursor-pointer border py-20 bg-gray-200 rounded-md"
                            >
                              <svg
                                width="21"
                                height="20"
                                viewBox="0 0 21 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.0925 2.4917C6.35684 2.4917 4.48901 2.4917 3.32849 3.65177C2.16797 4.81185 2.16797 6.67896 2.16797 10.4132C2.16797 14.1473 2.16797 16.0145 3.32849 17.1746C4.48901 18.3347 6.35684 18.3347 10.0925 18.3347C13.8281 18.3347 15.6959 18.3347 16.8565 17.1746C18.017 16.0145 18.017 14.1473 18.017 10.4132V9.99626"
                                  stroke="black"
                                  strokeWidth="1.25"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M4.66602 17.4913C8.17433 13.5319 12.117 8.28093 17.9993 12.2192"
                                  stroke="black"
                                  strokeWidth="1.25"
                                />
                                <path
                                  d="M15.4982 1.66504V8.33847M18.8362 4.98087L12.1602 4.99327"
                                  stroke="black"
                                  strokeWidth="1.25"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1 w-full">
                      <label
                        htmlFor="categoriesName"
                        className="text-sm font-semibold text-gray-600"
                      >
                        Categories Name
                      </label>
                      <input
                        type="text"
                        id="categoriesName"
                        name="categoriesName"
                        required
                        className="border border-gray-300 rounded-md p-2 focus:outline-noneF"
                      />
                    </div>
                    <div className="flex flex-col space-y-1 w-full">
                      <label
                        htmlFor="categoriesSlug"
                        className="text-sm font-semibold text-gray-600"
                      >
                        Slug
                      </label>
                      <input
                        type="text"
                        id="categoriesSlug"
                        readOnly
                        disabled
                        className="border border-gray-300 rounded-md p-2 focus:outline-none cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    <label
                      htmlFor="parentCategoryId"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Parent Categories
                    </label>
                    <br />
                    <div className="relative flex border border-gray-300 px-2 mt-1 rounded-md bg-white hover:border-gray-400">
                      <svg
                        className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 412 232"
                      >
                        <path
                          d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                          fill="#648299"
                          fillRule="nonzero"
                        />
                      </svg>
                      <select
                        id="parentCategoryId"
                        name="parentCategoryId"
                        className=" text-gray-600 h-10 pl-5 pr-10 w-full focus:outline-none appearance-none"
                      >
                        <option value="">Select Parent Category</option>
                        {AllCategories?.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>


                  {error && (
                    <div className="text-red-500 text-sm mt-2">{error}</div>
                  )}
                  {message && (
                    <div className="text-green-500 text-sm mt-2">{message}</div>
                  )}

                  <button
                    type="submit"
                    className="py-2 px-4 mt-5 bg-black text-white rounded-md w-full"
                  >
                    {isLoading ? "Loading..." : "Add Category"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Modal>
        <ConfirmModal open={deleteCatModal} setOpen={setdeleteCatModal} onConfirm={handleDeleteCategory} title={'Are you sure to delete selected categories?'} />
      </div>
    </section>
  );
}
