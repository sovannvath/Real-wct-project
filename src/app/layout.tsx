import './globals.css'
import type { Metadata } from "next";
import './globals.css'


export const metadata: Metadata = {
  title: "Togethertechs",
  description: "A website that contain news for general users and developer to navigate throughout the world",
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <body>
        
          {children}
    
      </body>
    </html>
  );
}
