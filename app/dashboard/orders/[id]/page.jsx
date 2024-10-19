"use client";

import { useEffect, useState } from "react";
import SingleOrderPage from "./SingleOrderPage";
import Skeleton from "@/components/global/skeleton/Skeleton";
import { FetchApi } from "@/utils/FetchApi";

export default function Page({ params }) {
  const id = params.id;

  const [order, setOrder] = useState({});

  useEffect(() => {
    const fetchData = async () => {
     const {data} = await FetchApi({url:  `order/api/order_details/${id}/`})
     setOrder(data?.data)
    };

    fetchData();
  }, [id]);

  return (
    <main className="">
      {order?.order_id ? <SingleOrderPage order={order} /> : <Skeleton />}
    </main>
  );
}
