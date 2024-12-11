
import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import ContentSidebar from "@/components/ContentSidebar";


export const metadata: Metadata = {
  title: "Togethertechs",
  description: "A website that contain news for general users and developer to navigate throughout the world",
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
     
      <main className="flex">
      <ContentSidebar></ContentSidebar>
        {children}
      </main>

      </body>
    </html>
  );
}
