import type { Metadata } from "next";
import AdminSidebar from "@/components/AdminSidebar"

export const metadata: Metadata = {
  title: "Togethertechs",
  description:
    "A website that contains news for general users and developers to navigate throughout the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
      <section className="h-screen flex flex-col">
        {/* Sidebar and Content Layout */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <AdminSidebar />

          {/* Main Content */}
          <main className="flex-1  bg-gray-100 overflow-auto">
            {children}
          </main>
        </div>
      </section>
  );
}
