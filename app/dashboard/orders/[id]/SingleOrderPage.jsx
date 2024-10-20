"use client";
import DynamicHead from "@/components/dashboard/orderpage/dynamic/DynamicHead";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "../../loading";
import { useRouter } from "next/navigation";
import SelectInput from "@/components/global/input/SelectInput";
import { FetchApi } from "@/utils/FetchApi";
import Button from "@/components/global/primaryButton/Button";
import { allOrderStatus } from "@/utils/data";
import { ImgUrl } from "@/constants/urls";
import TextInput from "@/components/global/input/TextInput";

export default function SingleOrderPage({ order, addressStr }) {
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
    setIsLoading(true);
    try {
      const { data } = await FetchApi({
        url: `order/api/update-status/`,
        method: "put",
        isToast: true,
        body: {
          order_id: order?.order_id,
          new_status: e.target.status.value,
        },
      });
      setIsLoading(false);
      router.push("/dashboard/orders");
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

 
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
                  <TextInput
                    type="text"
                    id="orderDate"
                    value={formatDate(order?.created_at)}
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
                  <TextInput
                    type="text"
                    id="customer"
                    defaultValue={
                      order?.user?.name !== " " ? order?.user?.name : "No name"
                    }
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
                    <TextInput
                      type="email"
                      id="email"
                      readOnly
                      value={order?.user?.email}
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
                    <TextInput
                      type="text"
                      id="phone"
                      readOnly
                      value={order?.user?.phone_number}
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
                      rows={5}
                      value={addressStr}
                      className="border border-gray-300 rounded-md text-sm p-2 focus:outline-none w-full"
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
                      Color
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
                  {order?.order_items?.map((product, i) => (
                    <tr key={i} className="">
                      <td className="py-4 px-1 text-sm font-medium text-gray-900 whitespace-nowrap">
                        <div className="flex justify-start items-center text-wrap">
                          <Image
                            width={100}
                            height={100}
                            className="w-10 h-10 rounded-xl"
                            src={ImgUrl + product?.product?.images?.[0]?.image}
                            alt="product_images"
                          />
                          <div className="ml-2">
                            <span className="text-sm">
                              {product?.product?.productName}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-1 text-sm font-medium text-gray-500 whitespace-nowrap ">
                        {product?.quantity}
                      </td>
                      <td className="py-4 px-1 text-sm font-medium text-gray-500 whitespace-nowrap ">
                        {product?.color}
                      </td>
                      <td className="py-4 px-1 text-sm font-medium text-gray-900 whitespace-nowrap ">
                        <span className="text-md">৳</span>
                        <span className="text-md">{product?.price}</span>
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
                      ৳{order?.shipping_cost}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b-2 pb-2 mb-2">
                    <span className="text-gray-600 text-sm">Vat</span>
                    <span className="ml-24 text-md font-semibold">
                      ৳{order?.vat}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b-2 pb-2">
                    <span className="text-gray-600 text-sm font-semibold">
                      Order total
                    </span>
                    <span className="ml-24 text-md font-semibold">
                      ৳{order?.grand_total}
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
              <h5 className=" font-bold mb-3">{order?.status}</h5>
              <SelectInput
                className={`!rounded-md`}
                name={"status"}
                label={"Order Status"}
                options={allOrderStatus}
                defaultValue={order?.status}
              />
              <div className="flex justify-center mt-3">
                <Button className={"!mx-auto"} rounded="md">
                  Change Status
                </Button>
              </div>
            </form>
            {/* two */}
            {/* <div className="p-5 border bg-white rounded-md shadow-md w-full">
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
            </div> */}
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
            {/* <form
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
            </form> */}
          </div>
        </section>
      </div>
    </main>
  );
}
