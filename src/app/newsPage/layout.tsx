
import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"


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
      <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>

      </body>
    </html>
  );
}
