'use client'
import Sidebar from "@/components/global/sidebar/Sidebar";
import TopBar from "@/components/global/topbar/TopBar";
import { useAuth } from "@/utils/functions";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const { auth } = useAuth();
  const router = useRouter()
  if (!auth.id) {
    router.push('/auth/login')
  }
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
