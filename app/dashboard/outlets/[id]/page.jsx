"use client";
import InventoryTable from "@/components/dashboard/outletspage/dynamic/InventoryTable";
import OutletsDynamicHead from "@/components/dashboard/outletspage/dynamic/OutletsDynamicHead";
import SelectInput from "@/components/global/input/SelectInput";
import TextInput from "@/components/global/input/TextInput";
import { FetchApi } from "@/utils/FetchApi";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const [managers, setManagers] = useState([]);
  const [managersData, setManagersData] = useState([]);
  const [outletData, setOutletData] = useState({});
  const [selectedManager, setselectedManager] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const { data } = await FetchApi({ url: `outlet/api/get-outlet/${id}` });
      setOutletData(data.data);
      setselectedManager(data.data.manager_details);
      const { data: users } = await FetchApi({ url: "/auth/api/all-users/" });
      const managers = users.data.map((item) => ({
        value: item.manager_id,
        name: item.first_name + " " + item.last_name,
        phone_number: item.phone_number,
        email: item.email,
        role: item.role,
        first_name: item.first_name,
        last_name: item.last_name,
      }));
      setManagers(managers.filter((item) => item.role === "outlet_manager"));
      setManagersData(
        users.data.filter((item) => item.role === "outlet_manager")
      );
    };
    loadData();
  }, []);
  const ref = useRef();
  useEffect(() => {
    if (!selectedManager || !ref.current) return; // Safety check
  
    const manager = managers.find((item) => item.value === selectedManager.value);
    if (manager && ref.current) {
      const managerPhoneInput = ref.current.querySelector('[name="managerPhone"]');
      const managerEmailInput = ref.current.querySelector('[name="managerEmail"]');
      
      if (managerPhoneInput) {
        managerPhoneInput.value = manager.phone_number || "";
      }
      if (managerEmailInput) {
        managerEmailInput.value = manager.email || "";
      }
    }
  }, [selectedManager, managers]);
  
  console.log(selectedManager);
  return (
    <main className="">
      {/* top section */}
      <section className="mt-10 flex justify-between items-center">
        <OutletsDynamicHead id={outletData.outletName} />
        <button className="text-sm text-white bg-black rounded-md px-3 py-2 text-nowrap">
          Save Changes
        </button>
      </section>
      {/* flex main section */}
      <section className="grid grid-cols-1 justify-between items-start gap-5 w-full my-10">
        {/* main one section */}
        <div className="flex flex-col justify-start items-center w-full col-span-2 space-y-5">
          {/* one */}
          <div className="p-5 border bg-white rounded-md shadow-md w-full">
            <h5 className="text-md font-bold mb-3">Outlet info</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-between items-start gap-5 border-b-2 pb-10">
             

              <form
                ref={ref}
                className="col-span-2 grid grid-cols-2 justify-between items-center gap-5"
              >
                <TextInput
                  label={"Outlet Name"}
                  defaultValue={outletData.outletName}
                />
                <TextInput
                  label={"Outlet Location"}
                  defaultValue={outletData.location}
                />
                <SelectInput
                  label="Outlet Manager"
                  name="manager"
                  options={managers}
                  value={
                    selectedManager?.value || selectedManager?.id
                  }
                  onChange={(e) => {
                    const manager = managers.find(
                      (item) => item.value === e.target.value
                    );
                    setselectedManager(manager);
                  }}
                />
                <TextInput
                  label={"Manager Phone"}
                  defaultValue={selectedManager?.phone_number}
                  name={"managerPhone"}
                />
                <TextInput
                  label={"Manager Email"}
                  defaultValue={selectedManager?.email}
                  name={"managerEmail"}
                />
              </form>
            </div>
            <div className="pt-10">
              <InventoryTable />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
