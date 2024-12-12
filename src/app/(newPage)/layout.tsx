import type { Metadata } from "next";
import { AppSidebar } from "@/components/app-sidebar";
import ContentSidebar from "@/components/ContentSidebar";


export const metadata: Metadata = {
  title: "Togethertechs",
  description:
    "A website that contains news for general users and developers to navigate throughout the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          
          {/* Sidebar Component */}
          <ContentSidebar />
          {/* Main Content */}
          <main className="flex-1 p-4">
            {/* The children will render here */}
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
