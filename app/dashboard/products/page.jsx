"use client";
import ProductTable from "@/components/dashboard/productpage/ProductTable";
import PageHead from "@/components/global/pageHead/PageHead";
import Skeleton from "@/components/global/skeleton/Skeleton";
import { FetchApi } from "@/utils/FetchApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([])
  useEffect(() => {
    const loadData = async () => {
      const { data } = await FetchApi({ url: '/products/api/get-allProducts' })
      setProducts(data?.data)

    }
    loadData()
  }, [dispatch]);

  // console.log(product?.products?.products); 


  return (
    <main>
      {products.length < 0 ? (
        <Skeleton />
      ) : (
        <div>
          <PageHead pageHead="Products" />
          <ProductTable AllProducts={products} />
        </div>
      )}
    </main>
  );
}
