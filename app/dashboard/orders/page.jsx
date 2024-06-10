import PageHead from "@/components/global/pageHead/PageHead";

import OrderTable from "@/components/dashboard/orderpage/OrderTable";

export default function OrdersPage() {
  return (
    <main>
      <PageHead pageHead="Orders" />
      <OrderTable />
    </main>
  );
}
