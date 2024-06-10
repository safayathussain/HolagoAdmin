import OrderTable from "@/components/dashboard/orderpage/OrderTable";
import Analytics from "@/components/dashboard/reporting/Analytics";
import ReportingOverView from "@/components/dashboard/reporting/ReportingOverview";
import PageHead from "@/components/global/pageHead/PageHead";

export default function ReportingPage() {
  return (
    <main>
      <PageHead pageHead="Reporting" />
      <ReportingOverView />
      <Analytics />
      <OrderTable />
    </main>
  );
}
