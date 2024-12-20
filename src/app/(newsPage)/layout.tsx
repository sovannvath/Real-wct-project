import type { Metadata } from "next";
import ContentSidebar from "@/components/ContentSidebar";
import ContentHeader from "@/components/contentHeader"; 

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
        {/* Header Component */}
        <ContentHeader />

        {/* Sidebar and Content Layout */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <ContentSidebar />

          {/* Main Content */}
          <main className="flex-1  bg-gray-100 overflow-auto">
            {children}
          </main>
        </div>
      </section>
  
  );
}
