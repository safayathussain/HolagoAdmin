"use client";
import CouponDynamicHead from "@/components/dashboard/coupon/dynamic/CouponDynamicHead";
import { useParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { FetchApi } from "@/utils/FetchApi";
import Loader from "@/components/global/loader/Loader";
const CouponOption = React.lazy(() => import("./CouponOption"));

export default function page() {
  const { id } = useParams();
  const [coupon, setCoupon] = useState({});
  useEffect(() => {
    const loadData = async () => {
      const { data } = await FetchApi({
        url: `discount/api/get_discount/${id}`,
      });
      setCoupon(data?.data);
    };
    loadData();
  }, []);

  return (
    <main>
      <section className="mt-10 flex justify-between items-center">
        <CouponDynamicHead />
      </section>
      <Suspense fallback={<Loader />}>
        <CouponOption coupon={coupon} />
      </Suspense>
    </main>
  );
}
