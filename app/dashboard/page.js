
import OverView from "@/components/global/overview/OverView";
import PageHead from "@/components/global/pageHead/PageHead";
import { withAuth } from "@/components/withAuth";
import { store } from "@/redux/store";
import { useAuth } from "@/utils/functions";

function DashboardPage() {
  return (
    <main className="w-full">
      <PageHead pageHead="Dashboard" />
      <OverView />
    </main>
  );
}
export default DashboardPage
// export default withAuth(DashboardPage);
