// src/app/admin/layout.tsx
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-900">
      <AdminSidebar />  {/* Sidebar Component */}
      <div className="flex-1 p-6 overflow-auto bg-gray-800 text-white">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
