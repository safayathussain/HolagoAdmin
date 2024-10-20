"use client";
import PageHead from "@/components/global/pageHead/PageHead";

import { lazy, Suspense, useEffect, useState } from "react";
import { FetchApi } from "@/utils/FetchApi";
import Loader from "@/components/global/loader/Loader";
const OrderTable = lazy(() => import('@/components/dashboard/orderpage/OrderTable'));

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
      <div>
        <PageHead pageHead="Orders" />
        <Suspense fallback={<Loader />}>
          <OrderTable AllOrders={orders} />
        </Suspense>
      </div>
    </main>
  );
}
