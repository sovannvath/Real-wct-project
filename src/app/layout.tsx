import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Togethertechs",
  description: "A website that contain news for general users and developer to navigate throughout the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children} 
       
      </body>
    </html>
  );
}
