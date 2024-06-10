"use client";
import InventoryTable from "@/components/dashboard/outletspage/dynamic/InventoryTable";
import OutletsDynamicHead from "@/components/dashboard/outletspage/dynamic/OutletsDynamicHead";
import UserDynamicHead from "@/components/dashboard/userpage/dynamic/UserDynamicHead";

export default function Page() {
  return (
    <main className="">
      {/* top section */}
      <section className="mt-10 flex justify-between items-center">
        <UserDynamicHead />
        <button className="text-sm text-white bg-black rounded-md px-3 py-2">
          Save Changes
        </button>
      </section>
      {/* flex main section */}
      <section className="grid grid-cols-1 justify-between items-start gap-5 w-full my-10">
        {/* main one section */}
        <div className="flex flex-col justify-start items-center w-full col-span-2 space-y-5">
          {/* one */}
          <div className="p-5 border bg-white rounded-md shadow-md w-full">
            <h5 className="text-md font-bold mb-3">Personal info</h5>
            <div className="grid grid-cols-3 justify-between items-start gap-5 border-b-2 pb-10">
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
                <div className="flex flex-col col-span-2 space-y-1 w-full">
                  <label
                    htmlFor="userName"
                    className="text-sm font-semibold text-gray-600"
                  >
                    User Name
                  </label>
                  <input
                    type="text"
                    id="userName"
                    defaultValue={"Md Shaiful Islam"}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none "
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="outlateName"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Outlet
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
                        fill-rule="nonzero"
                      />
                    </svg>
                    <select className=" text-gray-600 h-10 pl-5 pr-10 w-full focus:outline-none appearance-none">
                      <option>Choose a Outlet</option>
                      <option>Banani</option>
                      <option>Gulshan</option>
                      <option>Motizhill</option>
                      <option>Merul</option>
                      <option>Demra</option>
                    </select>
                  </div>
                </div>
                <div className="">
                  <label
                    htmlFor="ordaerDate"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Role
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
                        fill-rule="nonzero"
                      />
                    </svg>
                    <select className=" text-gray-600 h-10 pl-5 pr-10 w-full focus:outline-none appearance-none">
                      <option>Choose a Role</option>
                      <option>Admin</option>
                      <option>Administrator</option>
                      <option>Manager</option>
                      <option>Developer</option>
                      <option>Outlet Manager</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col space-y-1 w-full">
                  <label
                    htmlFor="outletName"
                    className="text-sm font-semibold text-gray-600"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    defaultValue={"Md Shaiful"}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none "
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label
                    htmlFor="outletLocation"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    defaultValue={"Islam"}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none "
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label
                    htmlFor="outletName"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    defaultValue={"0165428413"}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none "
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label
                    htmlFor="outletLocation"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    defaultValue={"managerbanani@best.com.bd"}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none "
                  />
                </div>
              </div>
            </div>

            <div className="my-10">
              <h5 className="text-md font-bold mb-3 mt-10">
                Account Management
              </h5>
              <div className="grid grid-cols-4 justify-start items-center">
                <h5 className="text-gray-600 text-sm">
                  Set New Password
                </h5>
                <div className="flex">
                  <input
                    type="password"
                    id="firstName"
                    defaultValue={"Md Shaiful"}
                    className="border border-gray-300 rounded-lg focus:outline-none p-1 w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 justify-start items-center mt-5">
                <h5 className="text-gray-600 text-sm">
                  Password Reset Link
                </h5>
                  <button className="border-2 border-black px-3 py-1 text-sm text-black font-semibold rounded-md w-60 hover:bg-slate-100 duration-700">Send Password Reset Link</button>
               
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
