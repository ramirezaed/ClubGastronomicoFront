"use client";

import { AdminMenu } from "@/app/components/admin/adminMenu";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden text-gray-900 antialiased">
      <div className="fixed top-0 left-0 w-full h-1 bg-linear-to-r from-orange-500 to-orange-600 z-50" />
      <div className="flex flex-1 pt-1 overflow-hidden">
        <AdminMenu />
        <main className="flex-1 ml-0 lg:ml-64 flex flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
