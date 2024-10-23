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
  const [allProducts, setAllProducts] = useState([]);
  const [allProductsOptions, setAllProductsOptions] = useState([]);
  const [allCtgOptions, setAllCtgOptions] = useState([]);
  const [allUsersOptions, setAllUsersOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [couponRes, allProductsRes, ctgRes, usersRes] = await Promise.all(
          [
            FetchApi({ url: `discount/api/get_discount/${id}` }),
            FetchApi({ url: "/products/api/get-allProducts" }),
            FetchApi({ url: "/category/api/get-CategoryList" }),
            FetchApi({ url: "/customer/api/get_all_customers/" }),
          ]
        );

        setCoupon(couponRes?.data?.data);
        setAllProducts(allProductsRes?.data?.data || []);
        setAllProductsOptions(
          allProductsRes?.data?.data?.map((item) => ({
            label: item.productName,
            value: item?.id,
          }))
        );
        setAllCtgOptions(
          ctgRes?.data?.data?.map((item) => ({
            label: item.categoryName,
            value: item?.id,
          }))
        );
        setAllUsersOptions(
          usersRes?.data?.data?.map((item) => ({
            label: item?.phone_number,
            value: item?.id,
          }))
        );
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false); // Ensure we stop loading once data is fetched
      }
    };

    loadData();
  }, [id]);

  return (
    <main>
      <section className="mt-10 flex justify-between items-center">
        <CouponDynamicHead />
      </section>
      {isLoading ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <CouponOption
            coupon={coupon}
            id={id}
            allCtgOptions={allCtgOptions}
            allProducts={allProducts}
            allProductsOptions={allProductsOptions}
            allUsersOptions={allUsersOptions}
          />
        </Suspense>
      )}
    </main>
  );
}
