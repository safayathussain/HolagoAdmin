import Sidebar from "@/components/global/sidebar/Sidebar";
import TopBar from "@/components/global/topbar/TopBar";

export default function Layout({ children }) {
  return (
    <section className="min-h-screen flex flex-auto flex-shrink-0 antialiased">
      <Sidebar />
      <div className="h-auto w-full md:ml-auto px-5">
        <TopBar />
        {children}
      </div>
    </section>
  );
}
