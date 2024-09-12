"use client";
import CouponTab from "@/components/dashboard/coupon/dynamic/CouponTab";
import SettingTab from "@/components/dashboard/settings/SettingsTab";
import PageHead from "@/components/global/pageHead/PageHead";
import { useState } from "react";

export default function SettingOption() {
  const [showManage, setShowManage] = useState(false);
  const [showEmail, setShowEmail] = useState(true);
  const [baseSelectedColor, setBaseSelectedColor] = useState("#F26522");
  const [bgSelectedColor, setBgSelectedColor] = useState("#ffffff");
  const [bodyBgSelectedColor, setBodyBgSelectedColor] = useState("#ffffff");
  const [bodyTextSelectedColor, setBodyTextSelectedColor] = useState("#000000");

  const handleBaseColorChange = (event) => {
    setBaseSelectedColor(event.target.value);
  };
  const handleBodyBgColorChange = (event) => {
    setBodyBgSelectedColor(event.target.value);
  };
  const handleBgColorChange = (event) => {
    setBgSelectedColor(event.target.value);
  };
  const handleBodyTextColorChange = (event) => {
    setBodyTextSelectedColor(event.target.value);
  };

  const couponDataTabs = [
    {
      title: "Tax",
      content: (
        <section className="border bg-white rounded-md shadow-md p-5 my-10">
          <div className="flex justify-between items-center mt-5">
            <h2 className="text-black font-bold text-2xl">Tax Options</h2>
            <button className="text-sm text-white bg-black rounded-md px-3 py-2">
              Save Changes
            </button>
          </div>
          <div className="my-10">
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center">
              <h4 className="text-gray-600 text-sm ">
                Prices Entered with Tax
              </h4>
              <div className="col-span-2 font-semibold">
                <div className="flex justify-start items-center gap-2">
                  <input type="radio" name="" id="" />
                  <label htmlFor="">
                    Yes, I will enter prices inclusive of tax
                  </label>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <input type="radio" name="" id="" />
                  <label htmlFor="">
                    No, I will enter prices exclusive of tax
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center my-5">
              <h4 className="text-gray-600 text-sm ">Calculate Tax based on</h4>
              <div className="">
                <div>
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
                      <option>Shop base address</option>
                      <option>Customer shipping address</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center my-5">
              <h4 className="text-gray-600 text-sm ">Shipping tax class</h4>
              <div className="">
                <div>
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
                      <option>Shipping tax class based on cart items</option>
                      <option>Customer shipping address</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center my-5">
              <h4 className="text-gray-600 text-sm ">Rounding</h4>
              <div className="">
                <div className="flex justify-start items-center gap-2">
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">
                    Round tax at subtotal level, instead of per line
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center my-5">
              <h4 className="text-gray-600 text-sm ">Additional tax classes</h4>
              <div className="">
                <div className="flex justify-start items-center gap-2">
                  <input
                    type="text"
                    id="sku"
                    defaultValue={"Reduced rate Zero rate"}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center my-5">
              <h4 className="text-gray-600 text-sm ">
                Display prices in the shop
              </h4>
              <div className="">
                <div>
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
                      <option>Including Tax</option>
                      <option>Customer shipping address</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center my-5">
              <h4 className="text-gray-600 text-sm ">
                Display prices during cart & checkout
              </h4>
              <div className="">
                <div>
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
                      <option>Including Tax</option>
                      <option>Customer shipping address</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center my-5">
              <h4 className="text-gray-600 text-sm ">Price display suffix</h4>
              <div className="">
                <div className="flex justify-start items-center gap-2">
                  <input
                    type="text"
                    id="sku"
                    defaultValue={"incl. VAT"}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center my-5">
              <h4 className="text-gray-600 text-sm ">Display Tax totals</h4>
              <div className="">
                <div>
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
                      <option>Itemized</option>
                      <option>Customer shipping address</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ),
    },
    {
      title: "Payments",
      content: (
        <section className="border bg-white rounded-md shadow-md p-5 my-10">
          {/* {setShowManage ? ( */}
          <div className={`${showManage === true ? "hidden " : ""}`}>
            <div className="flex justify-between items-center mt-5">
              <h2 className="text-black font-bold text-2xl">Payments</h2>
            </div>

            <div>
              <table className="table-auto w-full my-10">
                <thead className="text-md font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Method</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Enabled</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-md divide-y divide-gray-100 pt-5">
                  <tr>
                    <td className="whitespace-nowrap p-2">
                      <div className="flex items-center">
                        <div className="font-semibold text-black">
                          Digital Payment
                        </div>
                      </div>
                    </td>
                    <td className="relative ">
                      <label className="toggle-switch">
                        <input type="checkbox" />
                        <div className="toggle-switch-background">
                          <div className="toggle-switch-handle"></div>
                        </div>
                      </label>
                    </td>
                    <td>
                      <button
                        onClick={() => setShowManage(true)}
                        className="text-sm text-black font-semibold border-2 border-black rounded-lg px-3 py-1"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                  <tr className="">
                    <td className="whitespace-nowrap p-2">
                      <div className="flex items-center">
                        <div className="font-semibold text-black">
                          Cash on Delivery
                        </div>
                      </div>
                    </td>
                    <td className="relative">
                      <label className="toggle-switch">
                        <input type="checkbox" />
                        <div className="toggle-switch-background">
                          <div className="toggle-switch-handle"></div>
                        </div>
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className={`${showManage === false ? "hidden" : ""}`}>
            <div className="flex justify-start items-center">
              <svg
                onClick={() => setShowManage(false)}
                width="13"
                height="20"
                viewBox="0 0 13 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 2L3 10L11 18" stroke="black" strokeWidth="3" />
              </svg>
              <h2 className="text-2xl font-bold ml-5">Digital Payments</h2>
            </div>
            <h2 className="text-xl font-bold my-5">
              sslcommerz Payment Gateway
            </h2>
            <div>
              <div className="grid grid-cols-3 justify-between items-center my-5">
                <h4 className="text-gray-600 text-sm ">Rounding</h4>
                <div className="">
                  <div className="flex justify-start items-center gap-2">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">
                      Round tax at subtotal level, instead of per line
                    </label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 justify-between items-center my-5">
                <h4 className="text-gray-600 text-sm ">
                  Additional tax classes
                </h4>
                <div className="">
                  <div className="flex justify-start items-center gap-2">
                    <input
                      type="text"
                      id="sku"
                      defaultValue={"Reduced rate Zero rate"}
                      className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 justify-between items-center my-5">
                <h4 className="text-gray-600 text-sm ">
                  Additional tax classes
                </h4>
                <div className="">
                  <div className="flex justify-start items-center gap-2">
                    <input
                      type="text"
                      id="sku"
                      defaultValue={"Reduced rate Zero rate"}
                      className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 justify-between items-center my-5">
                <h4 className="text-gray-600 text-sm ">Rounding</h4>
                <div className="">
                  <div className="flex justify-start items-center gap-2">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">
                      Round tax at subtotal level, instead of per line
                    </label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 justify-between items-center my-5">
                <h4 className="text-gray-600 text-sm ">
                  Calculate Tax based on
                </h4>
                <div className="">
                  <div>
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
                        <option>Shop base address</option>
                        <option>Customer shipping address</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 justify-between items-center my-5">
                <h4 className="text-gray-600 text-sm ">
                  Calculate Tax based on
                </h4>
                <div className="">
                  <div>
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
                        <option>Shop base address</option>
                        <option>Customer shipping address</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ),
    },
    {
      title: "Emails",
      content: (
        <section className="border bg-white rounded-md shadow-md p-5 my-10">
          <div className={`${showEmail === true ? "" : "hidden"}`}>
            <div className="flex justify-between items-center mt-5">
              <h2 className="text-black font-bold text-2xl">Emails</h2>
            </div>
            <h4 className="text-lg font-semibold my-5 text-black">
              Notifications
            </h4>
            <table className="table-auto w-full mb-10 shadow-sm">
              <thead className="text-md font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Email</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Enabled</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">recipients</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Action</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-md pt-5">
                <tr>
                  <td className="whitespace-nowrap p-2">
                    <div className="flex items-center">
                      <div className="font-semibold text-black">New Order</div>
                    </div>
                  </td>
                  <td className="relative ">
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <div className="toggle-switch-background">
                        <div className="toggle-switch-handle"></div>
                      </div>
                    </label>
                  </td>
                  <td className="whitespace-nowrap p-2">
                    <div className="flex items-center">
                      <div className="font-semibold text-black">
                        example@example.com
                      </div>
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => setShowEmail(false)}
                      className="text-sm text-black font-semibold border-2 border-black rounded-lg px-3 py-1"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="whitespace-nowrap p-2">
                    <div className="flex items-center">
                      <div className="font-semibold text-black">
                        Cancelled Order
                      </div>
                    </div>
                  </td>
                  <td className="relative ">
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <div className="toggle-switch-background">
                        <div className="toggle-switch-handle"></div>
                      </div>
                    </label>
                  </td>
                  <td className="whitespace-nowrap p-2">
                    <div className="flex items-center">
                      <div className="font-semibold text-black">
                        example@example.com , holder@gmail.com
                      </div>
                    </div>
                  </td>
                  <td>
                    <button className="text-sm text-black font-semibold border-2 border-black rounded-lg px-3 py-1">
                      Manage
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap p-2">
                    <div className="flex items-center">
                      <div className="font-semibold text-black">Failed Order</div>
                    </div>
                  </td>
                  <td className="relative ">
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <div className="toggle-switch-background">
                        <div className="toggle-switch-handle"></div>
                      </div>
                    </label>
                  </td>
                  <td className="whitespace-nowrap p-2">
                    <div className="flex items-center">
                      <div className="font-semibold text-black">
                        example@example.com
                      </div>
                    </div>
                  </td>
                  <td>
                    <button className="text-sm text-black font-semibold border-2 border-black rounded-lg px-3 py-1">
                      Manage
                    </button>
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="whitespace-nowrap p-2">
                    <div className="flex items-center">
                      <div className="font-semibold text-black">Order-on-Hold</div>
                    </div>
                  </td>
                  <td className="relative ">
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <div className="toggle-switch-background">
                        <div className="toggle-switch-handle"></div>
                      </div>
                    </label>
                  </td>
                  <td className="whitespace-nowrap p-2">
                    <div className="flex items-center">
                      <div className="font-semibold text-black">Customer</div>
                    </div>
                  </td>
                  <td>
                    <button className="text-sm text-black font-semibold border-2 border-black rounded-lg px-3 py-1">
                      Manage
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap p-2">
                    <div className="flex items-center">
                      <div className="font-semibold text-black">
                        Processing Order
                      </div>
                    </div>
                  </td>
                  <td className="relative ">
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <div className="toggle-switch-background">
                        <div className="toggle-switch-handle"></div>
                      </div>
                    </label>
                  </td>
                  <td className="whitespace-nowrap p-2">
                    <div className="flex items-center">
                      <div className="font-semibold text-black">Customer</div>
                    </div>
                  </td>
                  <td>
                    <button className="text-sm text-black font-semibold border-2 border-black rounded-lg px-3 py-1">
                      Manage
                    </button>
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="whitespace-nowrap p-2">
                    <div className="flex items-center">
                      <div className="font-semibold text-black">
                        Completed Order
                      </div>
                    </div>
                  </td>
                  <td className="relative ">
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <div className="toggle-switch-background">
                        <div className="toggle-switch-handle"></div>
                      </div>
                    </label>
                  </td>
                  <td className="whitespace-nowrap p-2">
                    <div className="flex items-center">
                      <div className="font-semibold text-black">Customer</div>
                    </div>
                  </td>
                  <td>
                    <button className="text-sm text-black font-semibold border-2 border-black rounded-lg px-3 py-1">
                      Manage
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap p-2">
                    <div className="flex items-center">
                      <div className="font-semibold text-black">Refunded Order</div>
                    </div>
                  </td>
                  <td className="relative ">
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <div className="toggle-switch-background">
                        <div className="toggle-switch-handle"></div>
                      </div>
                    </label>
                  </td>
                  <td className="whitespace-nowrap p-2">
                    <div className="flex items-center">
                      <div className="font-semibold text-black">Customer</div>
                    </div>
                  </td>
                  <td>
                    <button className="text-sm text-black font-semibold border-2 border-black rounded-lg px-3 py-1">
                      Manage
                    </button>
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="whitespace-nowrap p-2">
                    <div className="flex items-center">
                      <div className="font-semibold text-black">
                        Customer Invoice / Order Details
                      </div>
                    </div>
                  </td>
                  <td className="relative ">
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <div className="toggle-switch-background">
                        <div className="toggle-switch-handle"></div>
                      </div>
                    </label>
                  </td>
                  <td className="whitespace-nowrap p-2">
                    <div className="flex items-center">
                      <div className="font-semibold text-black">Customer</div>
                    </div>
                  </td>
                  <td>
                    <button className="text-sm text-black font-semibold border-2 border-black rounded-lg px-3 py-1">
                      Manage
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap p-2">
                    <div className="flex items-center">
                      <div className="font-semibold text-black">Customer Note</div>
                    </div>
                  </td>
                  <td className="relative ">
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <div className="toggle-switch-background">
                        <div className="toggle-switch-handle"></div>
                      </div>
                    </label>
                  </td>
                  <td className="whitespace-nowrap p-2">
                    <div className="flex items-center">
                      <div className="font-semibold text-black">Customer</div>
                    </div>
                  </td>
                  <td>
                    <button className="text-sm text-black font-semibold border-2 border-black rounded-lg px-3 py-1">
                      Manage
                    </button>
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="whitespace-nowrap p-2">
                    <div className="flex items-center">
                      <div className="font-semibold text-black">Reset Password</div>
                    </div>
                  </td>
                  <td className="relative ">
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <div className="toggle-switch-background">
                        <div className="toggle-switch-handle"></div>
                      </div>
                    </label>
                  </td>
                  <td className="whitespace-nowrap p-2">
                    <div className="flex items-center">
                      <div className="font-semibold text-black">Customer</div>
                    </div>
                  </td>
                  <td>
                    <button className="text-sm text-black font-semibold border-2 border-black rounded-lg px-3 py-1">
                      Manage
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap p-2">
                    <div className="flex items-center">
                      <div className="font-semibold text-black">New Account</div>
                    </div>
                  </td>
                  <td className="relative ">
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <div className="toggle-switch-background">
                        <div className="toggle-switch-handle"></div>
                      </div>
                    </label>
                  </td>
                  <td className="whitespace-nowrap p-2">
                    <div className="flex items-center">
                      <div className="font-semibold text-black">Customer</div>
                    </div>
                  </td>
                  <td>
                    <button className="text-sm text-black font-semibold border-2 border-black rounded-lg px-3 py-1">
                      Manage
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="divide-y divide-gray-200">
              <div className="mb-10">
                <h4 className="text-lg font-semibold my-5 text-black">
                  Email sender options
                </h4>
                <div className="grid grid-cols-3 justify-between items-center my-5">
                  <h4 className="text-gray-600 text-sm "> “From” name</h4>
                  <div className="">
                    <div className="flex justify-start items-center gap-2">
                      <input
                        type="text"
                        id="sku"
                        defaultValue={"Best Electronics"}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 justify-between items-center my-5">
                  <h4 className="text-gray-600 text-sm ">“From” Address</h4>
                  <div className="">
                    <div className="flex justify-start items-center gap-2">
                      <input
                        type="text"
                        id="sku"
                        defaultValue={"Best Electronics"}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                      />
                    </div>
                  </div>
                </div>
                <button className="text-sm text-white bg-black rounded-md px-3 py-2">
                  Save Changes
                </button>
              </div>
              <div className="mt-15">
                <div className="grid grid-cols-3 justify-between items-center my-5">
                  <h4 className="text-gray-600 text-sm ">Header image</h4>
                  <div className="">
                    <div className="flex justify-start items-center gap-2">
                      <input
                        type="text"
                        id="sku"
                        defaultValue={"www.bestlectronics.com/email_logo.png"}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 justify-between items-center my-5">
                  <h4 className="text-gray-600 text-sm ">Footer text</h4>
                  <div className="">
                    <div className="flex justify-start items-center gap-2">
                      <textarea
                        type="text"
                        id="footer_text"
                        cols={40}
                        defaultValue={
                          "Lorem ipsum dolor sit amet consectetur. Faucibus malesuada luctus netus purus sagittis consequat viverra."
                        }
                        className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 justify-between items-center my-5">
                  <h4 className="text-gray-600 text-sm ">Base color</h4>
                  <div className="border border-gray-300 rounded-md p-2">
                    <div className="flex justify-start items-center gap-2">
                      <input
                        type="color"
                        id="baseColorInput"
                        value={baseSelectedColor}
                        onChange={handleBaseColorChange}
                        className="focus:outline-none w-6 h-6 bg-white"
                      />
                      <span>{baseSelectedColor.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 justify-between items-center my-5">
                  <h4 className="text-gray-600 text-sm ">Background color</h4>
                  <div className="border border-gray-300 rounded-md p-2">
                    <div className="flex justify-start items-center gap-2">
                      <input
                        type="color"
                        id="bgColorInput"
                        value={bgSelectedColor}
                        onChange={handleBgColorChange}
                        className="focus:outline-none w-6 h-6 bg-white"
                      />
                      <span>{bgSelectedColor.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 justify-between items-center my-5">
                  <h4 className="text-gray-600 text-sm ">
                    Body background color
                  </h4>
                  <div className="border border-gray-300 rounded-md p-2">
                    <div className="flex justify-start items-center gap-2">
                      <input
                        type="color"
                        id="bodyBgColorInput"
                        value={bodyBgSelectedColor}
                        onChange={handleBodyBgColorChange}
                        className="focus:outline-none w-6 h-6 bg-white"
                      />
                      <span>{bodyBgSelectedColor.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 justify-between items-center my-5">
                  <h4 className="text-gray-600 text-sm ">body text color</h4>
                  <div className="border border-gray-300 rounded-md p-2">
                    <div className="flex justify-start items-center gap-2">
                      <input
                        type="color"
                        id="bodyTextColorInput"
                        value={bodyTextSelectedColor}
                        onChange={handleBodyTextColorChange}
                        className="focus:outline-none w-6 h-6 bg-white"
                      />
                      <span>{bodyTextSelectedColor.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
                <button className="text-sm text-white bg-black rounded-md px-3 py-2">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
          <div className={`${showEmail === true ? "hidden" : ""}`}>
            <div className="flex justify-start items-center">
              <svg
                onClick={() => setShowEmail(!showEmail)}
                width="13"
                height="20"
                viewBox="0 0 13 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 2L3 10L11 18" stroke="black" strokeWidth="3" />
              </svg>
              <h2 className="text-2xl font-bold ml-5">New Orders</h2>
            </div>
            <h2 className="text-xl font-bold my-5">
              sslcommerz Payment Gateway
            </h2>
            <div>
              <div className="grid grid-cols-3 justify-between items-center my-5">
                <h4 className="text-gray-600 text-sm ">Enable/Disable</h4>
                <div className="">
                  <div className="flex justify-start items-center gap-2">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">Enable this email notification</label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 justify-between items-center my-5">
                <h4 className="text-gray-600 text-sm ">Recipients</h4>
                <div className="">
                  <div className="flex justify-start items-center gap-2">
                    <input
                      type="email"
                      id="recipients"
                      defaultValue={"example@example.com"}
                      className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 justify-between items-center my-5">
                <h4 className="text-gray-600 text-sm ">Subject</h4>
                <div className="">
                  <div className="flex justify-start items-center gap-2">
                    <input
                      type="text"
                      id="sku"
                      defaultValue={"New Order: #{order_number}"}
                      className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 justify-between items-center my-5">
                <h4 className="text-gray-600 text-sm ">Email Heading</h4>
                <div className="">
                  <div className="flex justify-start items-center gap-2">
                    <input
                      type="text"
                      id="emailHeading"
                      defaultValue={"New Order: #{order_number}"}
                      className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 justify-between items-center my-5">
                <h4 className="text-gray-600 text-sm ">Additional Content </h4>
                <div className="">
                  <div className="flex justify-start items-center gap-2">
                    <textarea
                      type="text"
                      cols={40}
                      id="emailHeading"
                      defaultValue={"N/A"}
                      className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 justify-between items-center my-5">
                <h4 className="text-gray-600 text-sm ">Email Type</h4>
                <div className="">
                  <div className="flex justify-start items-center gap-2">
                    <input
                      type="text"
                      id="emailType"
                      disabled
                      defaultValue={"HTML"}
                      className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ),
    },
  ];
  return (
    <div>
      <PageHead pageHead="Settings" />
      <div>
        <CouponTab tabs={couponDataTabs} />
      </div>
    </div>
  );
}
