"use client"
import Loader from "@/components/global/loader/Loader";
import { FetchApi } from "@/utils/FetchApi";
import { lazy, Suspense, useEffect, useState } from "react";
const AddOutlet = lazy(() => import('@/components/dashboard/outletspage/AddOutlet'));

export default function Page() {
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const { data } = await FetchApi({ url: "/auth/api/all-users/" });
      const users = data.data.map((item) => ({
        value: item.manager_id,
        name: (item?.first_name || item?.last_name) ? (item.first_name + " " + item.last_name) : item?.phone_number,
        phone_number: item.phone_number,
        email: item.email,
        role: item.role,
        first_name: item.first_name,
        last_name: item.last_name,
      }));
      setManagers([
        {
            value: null,
            name: null
        },
        ...users.filter((item) => item.role === "outlet_manager"),
      ]);
    };
    loadData();
  }, []);
  return (
    <Suspense fallback={<Loader />}>
      <AddOutlet managers={managers} />
    </Suspense>
  );
}
