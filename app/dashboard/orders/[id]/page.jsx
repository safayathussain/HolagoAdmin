"use client";

import { fetchApi } from "@/utils/FetchApi";
import { useEffect, useState } from "react";
import SingleOrderPage from "./SingleOrderPage";
import Skeleton from "@/components/global/skeleton/Skeleton";

export default function Page({ params }) {
  const id = params.id;

  const [order, setOrder] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchApi(`/order/getOrderById/${id}`, "GET");
        setOrder(data?.order);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [id]);

  console.log(order);
  
  return (
    <main className="">
      {order?.orderId ? <SingleOrderPage order={order} /> : <Skeleton />}
    </main>
  );
}
