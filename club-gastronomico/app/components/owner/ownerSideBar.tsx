"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Package, Shield, LogOut, Menu, X, User as UserIcon, Building2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useAuth } from "@/hook/useAuth";

export function OwnerSideBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const { logout } = useAuth();

  const menuItems = [
    {
      label: "Personal",
      icon: Users,
      href: "/personal",
      active: pathname === "/personal" || pathname?.startsWith("/personal/"),
    },
    {
      label: "Informes",
      icon: Building2,
      href: "/dashboard",
      active: pathname === "/reports" || pathname?.startsWith("/dashboard/"),
    },
    {
      label: "Menu",
      icon: Package,
      href: "/menu",
      active: pathname === "/menu" || pathname?.startsWith("/menu/"),
    },
    {
      label: "Roles",
      icon: Shield,
      href: "/roles",
      active: pathname === "/roles" || pathname?.startsWith("/roles/"),
    },
  ];

  return (
    <>
      {/* Botón hamburguesa - solo visible en el celular */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-xl bg-white shadow-lg border border-gray-200 hover:scale-105 transition-all duration-200"
      >
        {isOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
      </button>

      {/* Overlay - solo en celular*/}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      <aside
        className={`
          fixed
          top-0 left-0
          h-screen
          w-72 lg:w-64
          bg-white
          border-r border-gray-200
          z-40
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          flex flex-col
          shadow-xl
        `}
      >
        {/* Header del menú */}
        <div className="p-6 border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 shadow-lg flex items-center justify-center shrink-0">
              <UserIcon className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-800 truncate">{session?.user.name}</p>
              <p className="text-xs text-gray-500 truncate">{session?.user.email}</p>
            </div>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 
                  ${
                    item.active
                      ? "bg-linear-to-r from-indigo-50 to-purple-50 text-indigo-700 font-medium shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600 hover:scale-[1.02]"
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${item.active ? "text-indigo-600" : "text-gray-400"}`} />
                <span>{item.label}</span>
                {item.active && (
                  <div className="ml-auto w-1 h-6 bg-linear-to-b from-indigo-500 to-purple-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer con cerrar sesión */}
        <div className="p-4 border-t border-gray-200 shrink-0">
          <button
            onClick={logout}
            className="
              w-full flex items-center gap-3 px-4 py-3 rounded-xl
              bg-gray-50 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50
              transition-all duration-200 font-medium
              hover:scale-[1.02] cursor-pointer
            "
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
}
