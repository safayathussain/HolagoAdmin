"use client";
import DynamicHead from "@/components/dashboard/orderpage/dynamic/DynamicHead";
import { fetchApi } from "@/utils/FetchApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "../../loading";
import { useRouter } from "next/navigation";

export default function SingleOrderPage({ order }) {
  const [isLoading, setIsLoading] = useState(false);
  const [customerHistory, setCustomerHistory] = useState(null);
  const customerId = order?.customer?._id;
  const router = useRouter();

  function formatDate(dateString) {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    if (isNaN(date)) return "N/A";

    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  }

  const handleUpdateOrderStatus = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderStatus = formData.get("orderStatus");
    setIsLoading(true);
    try {
      const data = await fetchApi(`/order/${order?._id}`, "PUT", {
        orderStatus,
      });
      setIsLoading(false);
      router.push("/dashboard/orders");
      console.log(data);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleUpdateOrderNote = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderNote = formData.get("orderNote");
    setIsLoading(true);
    try {
      const data = await fetchApi(`/order/updateNote/${order?._id}`, "PUT", {
        orderNote,
      });
      setIsLoading(false);
      router.push("/dashboard/orders");
      console.log(data);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    const fetchCustomerHistory = async () => {
      if (!customerId) return;

      try {
        const res = await fetchApi(
          `/order/customerHistory/${customerId}`,
          "GET"
        );
        const data = res?.orders;
        setCustomerHistory(data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomerHistory();
  }, [customerId]);

  return (
    <main className="">
      {isLoading && <Loading />}
      <div>
        <section className="mt-10 flex justify-between items-center">
          <DynamicHead order={order} />
          {/* <button className="text-sm text-nowrap text-white bg-black rounded-md px-3 py-2">
          Save Changes
        </button> */}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 justify-between md:items-start gap-5 w-full my-10">
          <div className="flex flex-col justify-start items-center w-full md:col-span-2 space-y-5">
            {/* one */}
            <div className="p-5 border bg-white rounded-md shadow-md w-full">
              <h5 className="text-md font-bold mb-3">General</h5>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="orderDate"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Order date
                  </label>
                  <input
                    type="text"
                    id="orderDate"
                    value={formatDate(order?.updatedAt)}
                    readOnly
                    className="border border-gray-300 rounded-md p-2 focus:outline-none "
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="customer"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Customer
                  </label>
                  <input
                    type="text"
                    id="customer"
                    defaultValue={order?.firstName + " " + order?.lastName}
                    readOnly
                    className="border border-gray-300 rounded-md p-2 focus:outline-none "
                  />
                </div>
              </div>
            </div>
            {/* two */}
            <div className="p-5 border bg-white rounded-md shadow-md w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 justify-between items-start">
                <div className="flex flex-col justify-between items-start space-y-3">
                  <h5 className="text-md font-bold mb-3">Billing</h5>
                  <div className="flex flex-col space-y-1 w-full">
                    <label
                      htmlFor="billingDetails"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Billing Details
                    </label>
                    <textarea
                      id="billingDetails"
                      cols={30}
                      rows={3}
                      readOnly
                      value={order?.deliveryAddress}
                      className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                    />
                  </div>
                  <div className="flex flex-col space-y-1 w-full">
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      readOnly
                      value={order?.customer?.email}
                      className="border border-gray-300 rounded-md p-2 focus:outline-none "
                    />
                  </div>
                  <div className="flex flex-col space-y-1 w-full">
                    <label
                      htmlFor="phone"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      readOnly
                      value={order?.phoneNumber}
                      className="border border-gray-300 rounded-md p-2 focus:outline-none "
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between items-start space-y-3">
                  <h5 className="text-md font-bold mb-3">Shipping</h5>
                  <div className="flex flex-col space-y-1 w-full">
                    <label
                      htmlFor="shippingDetails"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Shipping Address
                    </label>
                    <textarea
                      id="shippingDetails"
                      readOnly
                      cols={30}
                      rows={3}
                      value={order?.deliveryAddress}
                      className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* three */}
            <div className="p-5 border bg-white rounded-md shadow-md w-full">
              <h5 className="text-md font-bold mb-3">Order Items</h5>
              <table className="min-w-full rounded-md table-auto">
                {/* table head */}
                <thead className="bg-gray-100 rounded-md">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-1 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-1 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-1 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white text-black ">
                  {order?.products?.map((product, i) => (
                    <tr key={i} className="">
                      <td className="py-4 px-1 text-sm font-medium text-gray-900 whitespace-nowrap">
                        <div className="flex justify-start items-center text-wrap">
                          <Image
                            width={100}
                            height={100}
                            className="w-10 h-10 rounded-xl"
                            src={product?.productImage}
                            alt="product_images"
                          />
                          <div className="ml-2">
                            <span className="text-sm">
                              {product?.productName}
                            </span>
                            <p className="text-sm text-gray-500">
                              SKU: {product?.sku}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-1 text-sm font-medium text-gray-500 whitespace-nowrap ">
                        {product?.quantity}
                      </td>
                      <td className="py-4 px-1 text-sm font-medium text-gray-900 whitespace-nowrap ">
                        <span className="text-md">৳</span>
                        <span className="text-md">{product?.totalPrice}</span>
                      </td>
                    </tr>
                  ))}

                  {/* <tr className="">
                  <td className="py-4 px-1 text-sm font-medium text-gray-900 whitespace-nowrap">
                    <div className="flex justify-start items-center text-wrap">
                      <img
                        className="w-10 h-10 rounded-xl"
                        src="https://i.ibb.co/jVPhV6Q/diego-gonzalez-I8l-Durtf-Ao-unsplash.jpg"
                        alt="product_images"
                      />
                      <div className="ml-2">
                        <span className="text-sm">
                          Conion Signature 56inch 4 Blades (Sparkling Blue)
                          Ceiling Fan
                        </span>
                        <p className="text-sm text-gray-500">
                          SKU: CON-FAN-6006
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-1 text-sm font-medium text-gray-500 whitespace-nowrap ">
                    1
                  </td>
                  <td className="py-4 px-1 text-sm font-medium text-gray-900 whitespace-nowrap ">
                    <span className="text-md">৳</span>
                    <span className="text-md">4000</span>
                  </td>
                  <td className="py-4 px-1 text-sm font-medium text-gray-900 whitespace-nowrap ">
                    <span className="text-md">৳</span>
                    <span className="text-md">4000</span>
                  </td>
                </tr> */}
                </tbody>
              </table>
              <div className="flex justify-end items-center my-10">
                <div>
                  <div className="flex justify-between items-center border-b-2 pb-2 mb-2">
                    <span className="text-gray-600 text-sm">Delivery</span>
                    <span className="ml-24 text-md font-semibold">
                      ৳{order?.deliveryCharge}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b-2 pb-2 mb-2">
                    <span className="text-gray-600 text-sm">Vat</span>
                    <span className="ml-24 text-md font-semibold">
                      ৳{order?.vatRate}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b-2 pb-2">
                    <span className="text-gray-600 text-sm font-semibold">
                      Order total
                    </span>
                    <span className="ml-24 text-md font-semibold">
                      ৳{order?.totalPrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* main two section */}
          <div className="flex flex-col justify-start items-center w-full space-y-5">
            {/* one */}
            <form
              onSubmit={handleUpdateOrderStatus}
              className="p-5 border bg-white rounded-md shadow-md w-full"
            >
              <h5 className="text-md font-bold mb-3">{order?.orderStatus}</h5>
              <div className="mt-5">
                <label
                  htmlFor="orderStatus"
                  className="text-sm font-semibold text-gray-600"
                >
                  Order Status
                </label>{" "}
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
                  <select
                    name="orderStatus"
                    className="text-gray-600 h-10 pl-5 pr-10 w-full focus:outline-none appearance-none"
                  >
                    <option value="Received">Received</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Delivered">Delivered</option>
                    <option value="On-Hold">On-Hold</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Spammed">Spammed</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="text-white bg-black px-3 py-2 rounded-md w-full mt-5"
              >
                Change Status
              </button>
            </form>
            {/* two */}
            <div className="p-5 border bg-white rounded-md shadow-md w-full">
              <h5 className="text-md font-bold mb-3">Order Attribution</h5>
              <div className="grid grid-cols-2 justify-between items-center gap-y-5">
                <div>
                  <span className="text-sm text-gray-600">Origin</span>
                  <br />
                  <span className="text-md text-black font-semibold">
                    Direct
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Source Type</span>
                  <br />
                  <span className="text-md text-black font-semibold">
                    Typein
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">UTM Source</span>
                  <br />
                  <span className="text-md text-black font-semibold">
                    Direct
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Device Type</span>
                  <br />
                  <span className="text-md text-black font-semibold">
                    Mobile
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">
                    Session page views
                  </span>
                  <br />
                  <span className="text-md text-black font-semibold">5</span>
                </div>
              </div>
            </div>
            {/* three */}
            <div className="p-5 border bg-white rounded-md shadow-md w-full">
              <h5 className="text-md font-bold mb-3">Customer History</h5>
              <div className="grid grid-cols-1 justify-between items-center gap-y-5">
                <div>
                  <span className="text-sm text-gray-600">Total Orders</span>
                  <br />
                  <span className="text-md text-black font-semibold">
                    {customerHistory?.totalOrders}
                  </span>
                </div>
                {/* <div>
                  <span className="text-sm text-gray-600">Total revenue</span>
                  <br />
                  <span className="text-md text-black font-semibold">
                    ৳4000
                  </span>
                </div> */}
                <div>
                  <span className="text-sm text-gray-600">
                    Average order value
                  </span>
                  <br />
                  <span className="text-md text-black font-semibold">
                    ৳{customerHistory?.averageOrderValue}
                  </span>
                </div>
              </div>
            </div>
            {/* four */}
            <form
              onSubmit={handleUpdateOrderNote}
              className="p-5 border bg-white rounded-md shadow-md w-full"
            >
              <h5 className="text-md font-bold mb-3">Order Notes</h5>
              <div className="w-full bg-gray-100 p-3 mb-5 rounded-md">
                <p className="mb-3">
                  Payment to be made upon delivery. Order status changed from
                  Pending payment to Processing.
                </p>
              </div>
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="orderNote"
                  className="text-sm font-semibold text-gray-600"
                >
                  Note
                </label>
                <textarea
                  id="orderNote"
                  name="orderNote"
                  defaultValue={order?.orderNote}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none "
                />
              </div>

              <button
                type="submit"
                className="text-white bg-black px-3 py-2 rounded-md w-full mt-5"
              >
                Proceed
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
