"use client";
import { withAuth } from "@/utils/withAuth";

function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="admin-layout" className="min-h-screen">
      <div className="w-full bg-red-500 text-white text-center">ADMIN ONLY</div>
      {children}
    </div>
  );
}

export default withAuth(AdminLayout, { requiresAdmin: true });
