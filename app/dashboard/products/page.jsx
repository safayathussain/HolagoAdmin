"use client";
import ProductTable from "@/components/dashboard/productpage/ProductTable";
import PageHead from "@/components/global/pageHead/PageHead";
import Skeleton from "@/components/global/skeleton/Skeleton";
import { FetchApi } from "@/utils/FetchApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [refetch, setrefetch] = useState(0)
  useEffect(() => {
    const loadData = async () => {
      const { data } = await FetchApi({ url: '/products/api/get-allProducts' })
      setProducts(data?.data)

    }
    loadData()
  }, [refetch]);

  return (
    <main>
      {products.length < 0 ? (
        <Skeleton />
      ) : (
        <div>
          <PageHead pageHead="Products" />
          <ProductTable AllProducts={products} setrefetch={setrefetch}/>
        </div>
      )}
    </main>
  );
}
