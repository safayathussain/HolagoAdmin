"use client";
import SingleCtgPage from "@/components/dashboard/categoriespage/SingleCtgPage";
import { FetchApi } from "@/utils/FetchApi";
import { useEffect, useState } from "react";

export default function DynamicPage({ params }) {
  const id = params.id;

  const [data, setData] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const { data } = await FetchApi({ url: `/category/api/getCategoryById/${id}` })
      setData(data.data)
    }
    loadData()
  }, []);

  return (
    <main className="w-full my-5">
      <SingleCtgPage category={data} />
    </main>
  );
}
