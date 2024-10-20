"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import { FetchApi } from "@/utils/FetchApi";
import Loader from "@/components/global/loader/Loader";

const SingleOrderPage = lazy(() => import("./SingleOrderPage"));

export default function Page({ params }) {
  const id = params.id;

  const [order, setOrder] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await FetchApi({
        url: `order/api/order_details/${id}/`,
      });
      setOrder(data?.data);
    };

    fetchData();
  }, [id]);

  // Destructure safely with a default value
  const {
    name = '',
    phone_number = '',
    address = '',
    area = '',
    street = '',
    city = '',
    state = '',
    zip_code = ''
  } = order?.shipping_address || {}; // Provide a fallback to an empty object

  const addressStr = `${name}\nPhone: ${phone_number}\nAddress: ${address}, ${street}, ${area}, ${city}, ${state}, ${zip_code}`;

  return (
    <main className="">
      <Suspense fallback={<Loader />}>
        <SingleOrderPage order={order} addressStr={addressStr} />
      </Suspense>
    </main>
  );
}
