import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "TogetherTech",
  description: "Join us with togethertech",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
