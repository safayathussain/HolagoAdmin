"use client";
import InventoryTable from "@/components/dashboard/outletspage/dynamic/InventoryTable";
import OutletsDynamicHead from "@/components/dashboard/outletspage/dynamic/OutletsDynamicHead";

export default function Page() {
  return (
    <main className="">
      {/* top section */}
      <section className="mt-10 flex justify-between items-center">
        <OutletsDynamicHead />
        <button className="text-sm text-white bg-black rounded-md px-3 py-2 text-nowrap">
          Save Changes
        </button>
      </section>
      {/* flex main section */}
      <section className="grid grid-cols-1 justify-between items-start gap-5 w-full my-10">
        {/* main one section */}
        <div className="flex flex-col justify-start items-center w-full col-span-2 space-y-5">
          {/* one */}
          <div className="p-5 border bg-white rounded-md shadow-md w-full">
            <h5 className="text-md font-bold mb-3">Outlet info</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-start gap-5 border-b-2 pb-10">
              <div>
                <input type="file" id="file-upload" className="hidden " />
                <label
                  for="file-upload"
                  className="z-20 flex flex-col-reverse items-center justify-center w-[145px] h-[145px] cursor-pointer border py-2 bg-gray-200 rounded-md"
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
                      stroke-width="1.25"
                      stroke-linecap="round"
                    />
                    <path
                      d="M4.66602 17.4913C8.17433 13.5319 12.117 8.28093 17.9993 12.2192"
                      stroke="black"
                      stroke-width="1.25"
                    />
                    <path
                      d="M15.4982 1.66504V8.33847M18.8362 4.98087L12.1602 4.99327"
                      stroke="black"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </label>
              </div>

              <div className="col-span-2 grid grid-cols-2 justify-between items-center gap-5">
                <div className="flex flex-col space-y-1 w-full">
                  <label
                    htmlFor="outletName"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Outlet Name
                  </label>
                  <input
                    type="text"
                    id="outletName"
                    defaultValue={"BEL Banani"}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none "
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label
                    htmlFor="outletLocation"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Outlet Location
                  </label>
                  <input
                    type="text"
                    id="outletLocation"
                    defaultValue={"B/54 Road-5, Dhaka"}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none "
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full col-span-2">
                  <label
                    htmlFor="outletManager"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Outlet Manager
                  </label>
                  <div className="flex justify-start border border-gray-300 rounded-md p-2 gap-3">
                    <img
                      className="w-8 h-8"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                      alt="img"
                    />
                    <input
                      type="text"
                      id="outletManager"
                      defaultValue={"Sariful Islam"}
                      className=" focus:outline-none "
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label
                    htmlFor="outletName"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Manager Phone Number
                  </label>
                  <input
                    type="text"
                    id="managerPhoneNumber"
                    defaultValue={"0165428413"}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none "
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label
                    htmlFor="outletLocation"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Manager Email Address
                  </label>
                  <input
                    type="text"
                    id="managerEmail"
                    defaultValue={"managerbanani@best.com.bd"}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none "
                  />
                </div>
              </div>
            </div>
            <div className="pt-10">
              <InventoryTable />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
