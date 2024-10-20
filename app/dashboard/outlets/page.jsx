"use client"
import Loader from "@/components/global/loader/Loader";
import PageHead from "@/components/global/pageHead/PageHead";
import { FetchApi } from "@/utils/FetchApi";
import { lazy, Suspense, useEffect, useState } from "react";
const OutletsTable = lazy(() =>
  import("@/components/dashboard/outletspage/OutletsTable")
);
export default function Branch() {
  const [data, setdata] = useState([])
const [refetch, setrefetch] = useState(0)
  useEffect(() => {
    const loadData = async () => {
      const { data: outletsData } = await FetchApi({ url: '/outlet/api/get-all-outlets/' })
      setdata(outletsData.data)
    }
    loadData()
  }, [refetch])
  return (
    <main>
      <PageHead pageHead="Outlets" />
      <Suspense fallback={<Loader />}>
        <OutletsTable data={data} setrefetch={setrefetch}/>
      </Suspense>
    </main>
  );
}
