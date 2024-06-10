import OutletsTable from "@/components/dashboard/outletspage/OutletsTable";
import PageHead from "@/components/global/pageHead/PageHead";

export default function Branch() {
  return (
    <main>
      <PageHead pageHead="Outlets" />
      <OutletsTable />
    </main>
  );
}
