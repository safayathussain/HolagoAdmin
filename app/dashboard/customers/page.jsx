import Loader from "@/components/global/loader/Loader";
import PageHead from "@/components/global/pageHead/PageHead";
import { lazy, Suspense } from "react";
const CustomersTable = lazy(() =>
  import("@/components/dashboard/customers/CustomerTable")
);

export default function CustomersPage() {
  return (
    <main>
      <PageHead pageHead="Customers" />
      <Suspense fallback={<Loader />}>
        <CustomersTable />
      </Suspense>
    </main>
  );
}
