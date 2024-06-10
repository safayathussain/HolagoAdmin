
import CustomersTable from "@/components/dashboard/customers/CustomerTable";
import PageHead from "@/components/global/pageHead/PageHead";

export default function CustomersPage() {
  const titleData = ["All (1090)", "Published (576)", "Trash (576)"];
  return (
    <main>
      <PageHead pageHead="Customers" />
      
      
      <CustomersTable />
    </main>
  );
}
