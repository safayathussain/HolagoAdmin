"use client";
import Loader from "@/components/global/loader/Loader";
import PageHead from "@/components/global/pageHead/PageHead";
import { FetchApi } from "@/utils/FetchApi";
import { useState, useEffect, lazy, Suspense } from "react";
const CouponTable = lazy(() =>
  import("@/components/dashboard/coupon/CouponTable")
);
export default function page() {
  const [data, setdata] = useState([]);
  const [refetch, setrefetch] = useState(0);
  useEffect(() => {
    const loadData = async () => {
      const { data } = await FetchApi({
        url: "discount/api/getAllDiscount",
      });
      setdata(data?.data);
    };
    loadData();
  }, [refetch]);

  return (
    <main>
      <PageHead pageHead="Coupon" />
      <Suspense fallback={<Loader />}>
        <CouponTable coupons={data} setrefetch={setrefetch} />
      </Suspense>
    </main>
  );
}
