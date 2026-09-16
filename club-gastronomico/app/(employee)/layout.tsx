"use client";

import { EmployeeSideBar } from "@/app/components/employee/employeeSidebar";
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col text-gray-900 antialiased">
      <div className="flex flex-1 pt-1">
        <EmployeeSideBar />
        <main className="flex-1 ml-0 lg:ml-64 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
