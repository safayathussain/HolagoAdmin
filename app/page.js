"use client";
import { useAuth } from "@/utils/functions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { auth } = useAuth();
  useEffect(() => {
    if (auth.id) {
      router.push("/dashboard");
    } else {
      router.push("/auth/login");
    }
  }, [auth]);

  return <main className="">{/* <LoginPage /> */}</main>;
}
