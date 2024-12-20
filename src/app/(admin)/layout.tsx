"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!currentUser || currentUser.email !== "admin123@gmail.com") {
        router.push("/auth/login");
      }
    }
  }, [currentUser, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="h-screen flex">
      <AdminSidebar />
      <main className="flex-1 bg-gray-100">{children}</main>
    </section>
  );
}
