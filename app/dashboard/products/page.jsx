"use client";
import ProductTable from "@/components/dashboard/productpage/ProductTable";
import PageHead from "@/components/global/pageHead/PageHead";
import Skeleton from "@/components/global/skeleton/Skeleton";
import { fetchProducts } from "@/redux/slice/productsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state?.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // console.log(product?.products?.products); 

  const AllProducts = product?.products?.products;
  const data = AllProducts || [];

  return (
    <main>
      {data.length === 0 ? (
        <Skeleton />
      ) : (
        <div>
          <PageHead pageHead="Products" />
          <ProductTable AllProducts={AllProducts} />
        </div>
      )}
    </main>
  );
}
