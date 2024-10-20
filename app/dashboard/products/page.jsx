"use client";
import Loader from "@/components/global/loader/Loader";
import PageHead from "@/components/global/pageHead/PageHead";
import { FetchApi } from "@/utils/FetchApi";
import { lazy, Suspense, useEffect, useState } from "react";
const ProductTable = lazy(() =>
  import("@/components/dashboard/productpage/ProductTable")
);
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [refetch, setrefetch] = useState(0);
  useEffect(() => {
    const loadData = async () => {
      const { data } = await FetchApi({ url: "/products/api/get-allProducts" });
      setProducts(data?.data);
    };
    loadData();
  }, [refetch]);

  return (
    <main>
      <div>
        <PageHead pageHead="Products" />
        <Suspense fallback={<Loader />}>
          <ProductTable AllProducts={products} setrefetch={setrefetch} />
        </Suspense>
      </div>
    </main>
  );
}
