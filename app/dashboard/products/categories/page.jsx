"use client";
import CategoriesTable from "@/components/dashboard/categoriespage/CategoriesTable";
import PageHead from "@/components/global/pageHead/PageHead";
import Skeleton from "@/components/global/skeleton/Skeleton";
import { fetchCategories } from "@/redux/slice/categorySlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const AllCategories = categories?.categories?.categories;
  const data = AllCategories || [];

  return (
    <main>
      {data.length === 0 ? (
        <Skeleton />
      ) : (
        <div>
          <PageHead pageHead="Categories" />
          <CategoriesTable AllCategories={AllCategories} />
        </div>
      )}
    </main>
  );
}
