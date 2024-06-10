
import UsersTable from "@/components/dashboard/userpage/UserTable";
import PageHead from "@/components/global/pageHead/PageHead";

export default function UserManagementPage() {
  
  return (
    <main>
      <PageHead pageHead="User Management" />
      <UsersTable />
    </main>
  );
}
