// components/Layout.tsx
import Header from "@/components/Header";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
    <Header />
    {children}
    </>
        
      
  );
};

export default Layout;
