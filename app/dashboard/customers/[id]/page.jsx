"use client";
import CustomerDynamicHead from "@/components/dashboard/customers/dynamic/CustomerDynamichead";
import { useState } from "react";

export default function Page() {
  const productDataTabs = [
    {
      title: "General",
      content: (
        <div>
          <div className="grid grid-cols-2 gap-3 border-b-2 pb-5">
            <div className="flex flex-col space-y-1 w-full">
              <label
                htmlFor="ordaerDate"
                className="text-sm font-semibold text-gray-600"
              >
                Regular Price
              </label>
              <input
                type="text"
                id="productName"
                defaultValue={
                  "Conion Signature 56inch 4 Blades (Sparkling Blue) Ceiling Fan"
                }
                className="border border-gray-300 rounded-md p-2 focus:outline-none "
              />
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label
                htmlFor="ordaerDate"
                className="text-sm font-semibold text-gray-600"
              >
                Sale Price
              </label>
              <input
                type="text"
                id="productName"
                defaultValue={
                  "Conion Signature 56inch 4 Blades (Sparkling Blue) Ceiling Fan"
                }
                className="border border-gray-300 rounded-md p-2 focus:outline-none "
              />
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label
                htmlFor="salestartDate"
                className="text-sm font-semibold text-gray-600"
              >
                Sale Start (Optional)
              </label>
              <input
                type="date"
                id="productName"
                defaultValue={new Date().toISOString().split("T")[0]}
                className="border border-gray-300 rounded-md p-2 focus:outline-none "
              />
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label
                htmlFor="saleendDate"
                className="text-sm font-semibold text-gray-600"
              >
                Sale End (Optional)
              </label>
              <input
                type="date"
                id="saleendDate"
                defaultValue={new Date().toISOString().split("T")[0]}
                className="border border-gray-300 rounded-md p-2 focus:outline-none "
              />
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="taxstatus"
                className="text-sm font-semibold text-gray-600"
              >
                Tax Status
              </label>
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
                  <option>Choose a Status</option>
                  <option>No Shipping Class</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="taxstatus"
                className="text-sm font-semibold text-gray-600"
              >
                Tax Class
              </label>
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
                  <option>Choose a Class</option>
                  <option>No Shipping Class</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Inventory",
      content: (
        <div className="">
          <div className="grid grid-cols-2 justify-between items-center">
            <span>SKU</span>
            <input
              type="text"
              id="sku"
              className="border border-gray-300 rounded-md p-2 focus:outline-none "
            />
          </div>
          <div className="grid grid-cols-2 justify-between items-center my-5">
            <span>Stock Management</span>
            <div className="flex justify-start items-center gap-3">
              <input
                id="checkbox-all"
                type="checkbox"
                className="w-4 h-4 bg-gray-100 rounded border-gray-300   dark:border-gray-600"
              />
              <span className="font-semibold">
                Track stock quantity for this product
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 justify-between items-start border-b-2 py-5">
            <span>Stock Status</span>
            <div>
              <div className="flex justify-start items-center gap-3 mb-1">
                <input
                  id="inStock"
                  type="radio"
                  name="stockStatus"
                  value="inStock"
                  className="w-4 h-4 bg-gray-100 rounded border-gray-300   dark:border-gray-600"
                />
                <span className="font-semibold">In Stock</span>
              </div>
              <div className="flex justify-start items-center gap-3 mb-1">
                <input
                  id="outOfStock"
                  type="radio"
                  name="stockStatus"
                  value="outOfStock"
                  className="w-4 h-4 bg-gray-100 rounded border-gray-300   dark:border-gray-600"
                />
                <span className="font-semibold">Out of Stock</span>
              </div>
              <div className="flex justify-start items-center gap-3">
                <input
                  id="onBackorder"
                  type="radio"
                  name="stockStatus"
                  value="onBackorder"
                  className="w-4 h-4 bg-gray-100 rounded border-gray-300   dark:border-gray-600"
                />
                <span className="font-semibold">On Backorder</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 justify-between items-center mt-5">
            <span>Sold Individually</span>
            <div className="flex justify-start items-center gap-3">
              <input
                id="checkbox-all"
                type="checkbox"
                className="w-4 h-4 bg-gray-100 rounded border-gray-300   dark:border-gray-600"
              />
              <span className="font-semibold">
                Limit purchase to 1 item per order
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Shipping",
      content: (
        <div className="">
          <div className="grid grid-cols-2 justify-between items-center">
            <span>Wight (KG)</span>
            <input
              type="text"
              id="productName"
              className="border border-gray-300 rounded-md p-2 focus:outline-none "
            />
          </div>
          <div className="grid grid-cols-2 justify-between items-center border-b-2 py-5">
            <span>Dimension</span>
            <div className="grid grid-cols-3 gap-3">
              <input
                type="text"
                id="productName"
                placeholder="Length"
                className="border border-gray-300 rounded-md p-2 focus:outline-none "
              />
              <input
                type="text"
                id="productName"
                placeholder="Width"
                className="border border-gray-300 rounded-md p-2 focus:outline-none "
              />
              <input
                type="text"
                id="productName"
                placeholder="Height"
                className="border border-gray-300 rounded-md p-2 focus:outline-none "
              />
            </div>
          </div>
          <div className="grid grid-cols-2 justify-between items-center mt-5">
            <span>Tax Class</span>
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
                <option>Choose a Class</option>
                <option>No Shipping Class</option>
              </select>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <main className="">
      <section className="mt-10 flex justify-between items-center">
        <CustomerDynamicHead />
        <button className="text-sm text-white bg-black rounded-md px-3 py-2 text-nowrap">
          Save Changes
        </button>
      </section>
      {/* flex main section */}
      <section className="grid grid-cols-1 justify-between items-start gap-5 w-full my-10">
        {/* main one section */}
        <div className="flex flex-col justify-start items-center w-full col-span-2 space-y-5">
          {/* One */}
          <div className="p-5 border bg-white rounded-md shadow-md w-full">
            <h5 className="text-md font-bold mb-3">General</h5>
            <div className="grid grid-cols-1 md:grid-cols-4 justify-between items-start gap-5">
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
              <div className="md:col-span-3 ">
                <div className="grid grid-cols-3 justify-between items-center gap-5">
                  <div className="flex flex-col space-y-1 w-full">
                    <label
                      htmlFor="userName"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="userName"
                      defaultValue={"shaiadul"}
                      className="border border-gray-300 rounded-md p-2 focus:outline-none "
                    />
                  </div>
                  <div className="flex flex-col space-y-1 w-full">
                    <label
                      htmlFor="firstName"
                      className="text-sm font-semibold text-gray-600"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      defaultValue={"Md Shaiadul"}
                      className="border border-gray-300 rounded-md p-2 focus:outline-none "
                    />
                  </div>

                  <div className="flex flex-col space-y-1 w-full">
                    <label
                      htmlFor="lastName"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      defaultValue={"Bashar"}
                      className="border border-gray-300 rounded-md p-2 focus:outline-none "
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 justify-between items-center gap-5 mt-5">
                  <div className="flex flex-col space-y-1 w-full">
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      defaultValue={"shaiadulbasar@best.com.bd"}
                      className="border border-gray-300 rounded-md p-2 focus:outline-none "
                    />
                  </div>
                  <div className="flex flex-col space-y-1 w-full">
                    <label
                      htmlFor="phone"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phone"
                      defaultValue={"01700700625"}
                      className="border border-gray-300 rounded-md p-2 focus:outline-none "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Two */}
          <div className="p-5 border bg-white rounded-md shadow-md w-full">
            <h5 className="text-md font-bold mb-5">Billing Info</h5>
            <div className="grid grid-cols-2 justify-between items-start gap-5">
              <div className="flex flex-col space-y-1 w-full">
                <label
                  htmlFor="userName"
                  className="text-sm font-semibold text-gray-600"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  defaultValue={"Md Shaiadul"}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none "
                />
              </div>
              <div className="flex flex-col space-y-1 w-full">
                <label
                  htmlFor="firstName"
                  className="text-sm font-semibold text-gray-600"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  defaultValue={"Bashar"}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none "
                />
              </div>
              <div className="">
                <label
                  htmlFor="address1"
                  className="text-sm font-semibold text-gray-600"
                >
                  Address Line 1
                </label>{" "}
                <br />
                <div className="relative flex border border-gray-300 px-2 rounded-md bg-white hover:border-gray-400">
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
                    <option>Choose a Address</option>
                    <option>House-01, Road-02</option>
                    <option>House-02, Road-03</option>
                    <option>House-03, Road-04</option>
                  </select>
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="address2"
                  className="text-sm font-semibold text-gray-600"
                >
                  Address Line 2
                </label>{" "}
                <br />
                <div className="relative flex border border-gray-300 px-2 rounded-md bg-white hover:border-gray-400">
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
                    <option>Choose a Address</option>
                    <option>House-01, Road-02</option>
                    <option>House-02, Road-03</option>
                    <option>House-03, Road-04</option>
                  </select>
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="citySelect"
                  className="text-sm font-semibold text-gray-600"
                >
                  City
                </label>
                <br />
                <div className="relative flex border border-gray-300 px-2 rounded-md bg-white hover:border-gray-400">
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
                    <option>Choose a city</option>
                    <option>Dhaka</option>
                    <option>Chittagong</option>
                    <option>Rajshahi</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col space-y-1 w-full">
                <label
                  htmlFor="postalCode"
                  className="text-sm font-semibold text-gray-600"
                >
                  PostalCode / ZIP
                </label>
                <input
                  type="text"
                  id="postalCode"
                  defaultValue={"3100"}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none "
                />
              </div>
              <div className="flex flex-col space-y-1 w-full">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-600"
                >
                  Email Address
                </label>
                <input
                  type="text"
                  id="firstName"
                  defaultValue={"bashar@gmail.com"}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none "
                />
              </div>
              <div className="flex flex-col space-y-1 w-full">
                <label
                  htmlFor="phoneNumber"
                  className="text-sm font-semibold text-gray-600"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  defaultValue={"01913865741"}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none "
                />
              </div>
            </div>
          </div>
          {/* three */}
          <div className="p-5 border bg-white rounded-md shadow-md w-full">
            <div className="flex justify-between items-center mb-5">
              <h5 className="text-md font-bold ">Shipping Info</h5>
              <div className="flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9H16C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16V15Z"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <h5 className="text-md font-bold">Copy from Billing Info</h5>
              </div>
            </div>
            <div className="grid grid-cols-2 justify-between items-start gap-5">
              <div className="flex flex-col space-y-1 w-full">
                <label
                  htmlFor="userName"
                  className="text-sm font-semibold text-gray-600"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  defaultValue={"Md Shaiadul"}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none "
                />
              </div>
              <div className="flex flex-col space-y-1 w-full">
                <label
                  htmlFor="firstName"
                  className="text-sm font-semibold text-gray-600"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  defaultValue={"Bashar"}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none "
                />
              </div>
              <div className="">
                <label
                  htmlFor="address1"
                  className="text-sm font-semibold text-gray-600"
                >
                  Address Line 1
                </label>{" "}
                <br />
                <div className="relative flex border border-gray-300 px-2 rounded-md bg-white hover:border-gray-400">
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
                    <option>Choose a Address</option>
                    <option>House-01, Road-02</option>
                    <option>House-02, Road-03</option>
                    <option>House-03, Road-04</option>
                  </select>
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="address2"
                  className="text-sm font-semibold text-gray-600"
                >
                  Address Line 2
                </label>{" "}
                <br />
                <div className="relative flex border border-gray-300 px-2 rounded-md bg-white hover:border-gray-400">
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
                    <option>Choose a Address</option>
                    <option>House-01, Road-02</option>
                    <option>House-02, Road-03</option>
                    <option>House-03, Road-04</option>
                  </select>
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="citySelect"
                  className="text-sm font-semibold text-gray-600"
                >
                  City
                </label>
                <br />
                <div className="relative flex border border-gray-300 px-2 rounded-md bg-white hover:border-gray-400">
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
                    <option>Choose a city</option>
                    <option>Dhaka</option>
                    <option>Chittagong</option>
                    <option>Rajshahi</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col space-y-1 w-full">
                <label
                  htmlFor="postalCode"
                  className="text-sm font-semibold text-gray-600"
                >
                  PostalCode / ZIP
                </label>
                <input
                  type="text"
                  id="postalCode"
                  defaultValue={"3100"}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none "
                />
              </div>
              <div className="flex flex-col space-y-1 w-full">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-600"
                >
                  Email Address
                </label>
                <input
                  type="text"
                  id="firstName"
                  defaultValue={"bashar@gmail.com"}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none "
                />
              </div>
              <div className="flex flex-col space-y-1 w-full">
                <label
                  htmlFor="phoneNumber"
                  className="text-sm font-semibold text-gray-600"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  defaultValue={"01913865741"}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none "
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
