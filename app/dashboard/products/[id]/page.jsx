"use client";
import { FetchApi, fetchApi } from "@/utils/FetchApi";
import { lazy, Suspense, useEffect, useState } from "react";
import Loader from "@/components/global/loader/Loader";
const Product = lazy(() => import('./Product'));

export default function Page({ params }) {
  const id = params.id;
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await FetchApi({
          url: `/products/api/get-products/${id}`,
        });
        setData(data.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <main className="">
      <Suspense fallback={<Loader/>}>
        <Product product={data} />
      </Suspense>
    </main>
  );
}
