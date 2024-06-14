"use client";

import OverView from "@/components/global/overview/OverView";
import PageHead from "@/components/global/pageHead/PageHead";
import { withAuth } from "@/components/withAuth";

function DashboardPage() {
  return (
    <main className="w-full">
      <PageHead pageHead="Dashboard" />
      <OverView />
    </main>
  );
}

export default withAuth(DashboardPage);
