"use client";

import { AdminMenu } from "@/app/components/admin/adminMenu";
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen text-gray-900 antialiased">
      {/* 1. Línea naranja superior que cruza toda la pantalla de lado a lado */}
      <div className="h-1 w-full bg-linear-to-r from-orange-500 to-orange-600 z-50 shrink-0" />
      {/* 2. El contenedor de la app (Menú + Contenido) justo debajo de la línea */}
      <div className="flex flex-1 min-h-[calc(100vh-4px)]">
        {/* Menú lateral */}
        <AdminMenu />
        {/* Contenido principal: pegado al menú, sin márgenes */}
        <main className="flex-1  ml-0 lg:ml-64 flex flex-col ">{children}</main>
      </div>
    </div>
  );
}
