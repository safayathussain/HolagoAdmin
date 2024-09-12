import Link from "next/link";

export default function ProductTop() {
  return (
    <div className="flex justify-between items-center mt-5 border-b-2 pb-5">
      <h5 className="text-2xl font-bold">All Product</h5>
      <div className="flex justify-between items-center gap-3">
        <div className="ml-auto border border-[#F9FAFB] bg-[#F9FAFB] rounded-lg shadow-md">
          <select className="bg-[#F9FAFB] mx-3 py-2 outline-none">
            <option className="bg-[#F9FAFB]" value="30">
              Filter with
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
        {/* search bar */}
        <div className="max-w-lg mx-auto">
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
              className="peer h-full w-full outline-none text-sm text-gray-500 bg-[#F9FAFB] pr-2"
              type="text"
              id="search"
              placeholder="Search something.."
            />
          </div>
        </div>
        <div className="ml-auto border border-[#F9FAFB] bg-[#F9FAFB] rounded-lg shadow-md">
          <button className="mx-3 py-2">Export As &#x2193;</button>
        </div>
        <div className="ml-auto border border-[#F9FAFB] bg-[#F9FAFB] rounded-lg shadow-md">
          <select className="bg-[#F9FAFB] mx-3 py-2 outline-none">
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
        <div className="ml-auto text-white border border-black bg-black rounded-lg shadow-md">
          <Link href="/dashboard/addproduct" className="flex justify-center items-center px-2 py-1"><span className="text-xl font-semibold mr-1">+</span> <span>Add Product</span></Link>
        </div>
      </div>
    </div>
  );
}
