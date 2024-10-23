'use client'
import Loader from "@/components/global/loader/Loader";
import PageHead from "@/components/global/pageHead/PageHead";
import { FetchApi } from "@/utils/FetchApi";
import { lazy, Suspense, useEffect, useState } from "react";
const OverView = lazy(() => import("@/components/global/overview/OverView"));

function DashboardPage() {
  const [data, setdata] = useState({});
  useEffect(() => {
    const loadData = async () => {
      const { data } = await FetchApi({
        url: "dashboard/api/stats-dashboard/",
      });
      setdata(data?.data);
    };
    loadData();
  }, []);

  return (
    <main className="w-full">
      <PageHead pageHead="Dashboard" />
      <Suspense fallback={<Loader />}>
        <OverView data={data}/>
      </Suspense>
    </main>
  );
}
export default DashboardPage;
