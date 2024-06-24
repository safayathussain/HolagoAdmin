"use client";
import PageHead from "@/components/global/pageHead/PageHead";

import OrderTable from "@/components/dashboard/orderpage/OrderTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "@/redux/slice/orderSlice";
import { useEffect } from "react";
import Skeleton from "@/components/global/skeleton/Skeleton";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state?.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const AllOrders = orders?.orders?.orders;
  const data = AllOrders || [];

  return (
    <main>
      {data.length === 0 ? (
        <Skeleton />
      ) : (
        <div>
          <PageHead pageHead="Orders" />
          <OrderTable AllOrders={AllOrders} />
        </div>
      )}
    </main>
  );
}
