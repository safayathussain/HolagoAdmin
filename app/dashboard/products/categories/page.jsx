"use client";
import Loader from "@/components/global/loader/Loader";
import PageHead from "@/components/global/pageHead/PageHead";
import { FetchApi } from "@/utils/FetchApi";
import { lazy, Suspense, useEffect, useState } from "react";
const CategoriesTable = lazy(() =>
  import("@/components/dashboard/categoriespage/CategoriesTable")
);

export default function ProductsPage() {
  const [categories, setcategories] = useState([]);
  const [refetch, setrefetch] = useState(0);
  useEffect(() => {
    const loadData = async () => {
      const { data } = await FetchApi({
        url: "/category/api/get-CategoryList",
      });
      setcategories(data.data);
    };
    loadData();
  }, [refetch]);

  return (
    <main>
      <div>
        <PageHead pageHead="Categories" />
        <Suspense fallback={<Loader />}>
          <CategoriesTable AllCategories={categories} refetch={setrefetch} />
        </Suspense>
      </div>
    </main>
  );
}
