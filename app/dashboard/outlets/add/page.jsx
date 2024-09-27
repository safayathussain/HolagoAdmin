"use client";
import InventoryTable from "@/components/dashboard/outletspage/dynamic/InventoryTable";
import OutletsDynamicHead from "@/components/dashboard/outletspage/dynamic/OutletsDynamicHead";
import SelectInput from "@/components/global/input/SelectInput";
import TextInput from "@/components/global/input/TextInput";
import { FetchApi } from "@/utils/FetchApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState(managers[0]?.manager_id);
  const ref = useRef();

  useEffect(() => {
    const loadData = async () => {
      const { data } = await FetchApi({ url: "/auth/api/all-users/" });
      const users = data.data.map((item) => ({
        value: item.manager_id,
        name: item.first_name + " " + item.last_name,
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

  // Auto-fill manager phone number and email when a manager is selected
  useEffect(() => {
    const manager = managers.find(
      (item) => item.value === selectedManager
    );
    console.log(manager);
    if (manager && ref.current) {
      ref.current.managerPhone.value = manager?.phone_number || "";
      ref.current.managerEmail.value = manager?.email || "";
    }
  }, [selectedManager, managers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { outletName, location } = e.target;
    const data = {
      outletName: outletName.value,
      location: location.value,
      manager: selectedManager,
    };
    await FetchApi({
      url: "/outlet/api/create-outlet",
      method: "post",
      body: data,
      isToast: true,
    });
  };

  return (
    <form onSubmit={handleSubmit} ref={ref}>
      {/* top section */}
      <section className="mt-10 flex justify-between items-center">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-start items-center">
            <button type="button" onClick={() => router.back()}>
              <svg
                width="19"
                height="32"
                viewBox="0 0 19 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17 2L3 16L17 30" stroke="black" strokeWidth="3" />
              </svg>
            </button>

            <h1 className="text-lg md:text-5xl font-semibold ml-5">
              Add Outlet
            </h1>
          </div>
        </div>
        <button
          type="submit"
          className="text-sm text-white bg-black rounded-md px-3 py-2"
        >
          Add Outlet
        </button>
      </section>

      {/* flex main section */}
      <section className="grid grid-cols-1 justify-between items-start gap-5 w-full my-10">
        {/* main section */}
        <div className="flex flex-col justify-start items-center w-full col-span-2 space-y-5">
          {/* Outlet info */}
          <div className="p-5 border bg-white rounded-md shadow-md w-full">
            <h5 className="text-md font-bold mb-3">Outlet info</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-10 border-b-2">
              <div className="flex flex-col space-y-1 w-full">
                <TextInput label="Outlet Name" name="outletName" />
              </div>
              <div className="flex flex-col space-y-1 w-full">
                <TextInput label="Outlet location" name="location" />
              </div>
              <div className="flex flex-col space-y-1 w-full">
                <SelectInput
                  label="Outlet Manager"
                  name="manager"
                  options={managers}
                  onChange={(e) => setSelectedManager(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1 w-full">
                <TextInput label="Manager Phone Number" name="managerPhone" />
              </div>
              <div className="flex flex-col space-y-1 w-full">
                <TextInput label="Manager Email Address" name="managerEmail" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
}
