"use client";
import CategoriesTable from "@/components/dashboard/categoriespage/CategoriesTable";
import ConfirmModal from "@/components/global/modal/ConfirmModal";
import PageHead from "@/components/global/pageHead/PageHead";
import Skeleton from "@/components/global/skeleton/Skeleton";
import { FetchApi } from "@/utils/FetchApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const [categories, setcategories] = useState([])
  const [refetch, setrefetch] = useState(0)
  useEffect(() => {
    const loadData = async () => {
      const { data } = await FetchApi({ url: "/category/api/get-CategoryList" });
      setcategories(data.data)
      console.log(data)
    }
    loadData()
  }, [refetch])



  return (
    <main>
      {categories.length < 0 ? (
        <Skeleton />
      ) : (
        <div>
          <PageHead pageHead="Categories" />
          <CategoriesTable AllCategories={categories} refetch={setrefetch}/>
        </div>
      )}
    </main>
  );
}
