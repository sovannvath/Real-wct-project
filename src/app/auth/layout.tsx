// src/app/layout.tsx
import AuthListener from "@/components/auth/AuthListener"; // Adjust the import path if needed

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head />
      <body>
        <AuthListener /> 
        {children}
      </body>
    </html>
  );
};

export default Layout;
