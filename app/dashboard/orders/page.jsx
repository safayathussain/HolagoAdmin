"use client";
import PageHead from "@/components/global/pageHead/PageHead";

import OrderTable from "@/components/dashboard/orderpage/OrderTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Skeleton from "@/components/global/skeleton/Skeleton";
import { FetchApi } from "@/utils/FetchApi";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const { data } = await FetchApi({ url: "order/api/get_all_orders/" });
      setOrders(data.data);
    };
    loadData();
  }, []);


  return (
    <main>
      {orders.length === 0 ? (
        <Skeleton />
      ) : (
        <div>
          <PageHead pageHead="Orders" />
          <OrderTable AllOrders={orders} />
        </div>
      )}
    </main>
  );
}
