"use client"
import CouponDynamicHead from "@/components/dashboard/coupon/dynamic/CouponDynamicHead";
import React, { Suspense, useEffect, useState } from "react";
import Loader from "@/components/global/loader/Loader";
import { FetchApi } from "@/utils/FetchApi";
const CouponOption = React.lazy(() => import("../coupon/[id]/CouponOption"));

export default function page() {
  const [allProducts, setAllProducts] = useState([]);
  const [allProductsOptions, setAllProductsOptions] = useState([]);
  const [allCtgOptions, setAllCtgOptions] = useState([]);
  const [allUsersOptions, setAllUsersOptions] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const { data } = await FetchApi({
        url: "/products/api/get-allProducts",
      });
      const { data: ctg } = await FetchApi({
        url: "/category/api/get-CategoryList",
      });
      const { data: users } = await FetchApi({
        url: "/customer/api/get_all_customers/",
      });
      setAllProducts(data?.data);
      setAllProductsOptions(
        data?.data?.map((item) => ({
          label: item.productName,
          value: item?.id,
        }))
      );
      setAllCtgOptions(
        ctg?.data?.map((item) => ({
          label: item.categoryName,
          value: item?.id,
        }))
      );
      setAllUsersOptions(
        users?.data?.map((item) => ({
          label: item?.phone_number,
          value: item?.id,
        }))
      );
    };
    loadData();
  }, []);
  return (
    <main>
      <section className="mt-10 flex justify-between items-center">
        <CouponDynamicHead />
      </section>
      <Suspense fallback={<Loader />}>
      <CouponOption type="add" allProducts={allProducts} allProductsOptions={allProductsOptions} allUsersOptions={allUsersOptions} allCtgOptions={allCtgOptions}/>
      </Suspense>
    </main>
  );
}
