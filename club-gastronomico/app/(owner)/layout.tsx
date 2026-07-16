"use client";

import { OwnerSideBar } from "@/app/components/owner/ownerSideBar";
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col text-gray-900 antialiased">
      <div className="fixed top-0 left-0 w-full h-1 bg-linear-to-r from-orange-500 to-orange-600 z-50" />
      <div className="flex flex-1 pt-1">
        <OwnerSideBar />
        <main className="flex-1 ml-0 lg:ml-64 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
