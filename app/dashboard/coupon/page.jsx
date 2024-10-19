'use client'
import CouponTable from "@/components/dashboard/coupon/CouponTable";
import PageHead from "@/components/global/pageHead/PageHead";
import { FetchApi } from "@/utils/FetchApi";
import {useState, useEffect} from 'react';
export default function page() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const { data } = await FetchApi({
        url: "discount/api/getAllDiscount",
      });
      setdata(data?.data);
    };
    loadData();
  }, []);

  return (
    <main>
      <PageHead pageHead="Coupon" />
      <CouponTable coupons={data}/>
    </main>
  );
}
