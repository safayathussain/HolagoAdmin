"use client"; 
import DashboardTable from "@/components/dashboard/table/DashboardTable";
import OverView from "@/components/global/overview/OverView";
import PageHead from "@/components/global/pageHead/PageHead";
import { withAuth } from "@/components/withAuth";
// import withAuth from "@/components/withAuth";

function DashboardPage() {
  return (
    <main className="w-full">
      <PageHead pageHead="Dashboard" />
      <OverView />
      <DashboardTable />
    </main>
  );
}

export default withAuth(DashboardPage);