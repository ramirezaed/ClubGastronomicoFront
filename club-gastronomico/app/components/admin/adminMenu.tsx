"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Package, Shield, LogOut, Menu, X, User as UserIcon, Building2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useAuth } from "@/hook/useAuth";

export function AdminMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const { logout } = useAuth();

  const menuItems = [
    {
      label: "Usuarios",
      icon: Users,
      href: "/users",
      active: pathname === "/users" || pathname?.startsWith("/users/"),
    },
    {
      label: "Empresas",
      icon: Building2,
      href: "/company",
      active: pathname === "/company" || pathname?.startsWith("/company/"),
    },
    {
      label: "Planes",
      icon: Package,
      href: "/planes",
      active: pathname === "/planes" || pathname?.startsWith("/planes/"),
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
      {/* Botón hamburguesa - solo visible en móvil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-xl bg-white/95 backdrop-blur-sm shadow-lg border border-gray-100 hover:scale-105 transition-all duration-200"
      >
        {isOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
      </button>

      {/* Overlay - solo en móvil */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      <aside
        className={`
    fixed
    top-0 left-0
    h-screen
    w-72 lg:w-64
    bg-linear-to-r from-orange-100 via-orange-50 to-orange-100
    border-r border-orange-100
    z-40
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
    flex flex-col
  `}
      >
        {/* Header del menú */}
        <div className="p-6 border-b border-orange-200/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-r from-orange-500 to-orange-600 shadow-lg flex items-center justify-center shrink-0">
              <UserIcon className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-800 truncate">{session?.user.name}</p>
              <p className="text-xs text-gray-600 truncate">{session?.user.email}</p>
            </div>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto border-t-2 border-orange-200">
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
                      ? "bg-orange-100 text-orange-600 font-medium shadow-md"
                      : "text-gray-700 hover:bg-white/50 hover:text-orange-600 hover:scale-[1.02]"
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${item.active ? "text-orange-500" : "text-gray-500"}`} />
                <span>{item.label}</span>
                {item.active && (
                  <div className="ml-auto w-1 h-6 bg-linear-to-r from-orange-500 to-orange-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer con cerrar sesión */}
        <div className="p-4 border-t-2 border-orange-200 shrink-0">
          <button
            onClick={logout}
            className="
              w-full flex items-center gap-3 px-4 py-3 rounded-xl
              bg-white/60 text-orange-600 hover:text-orange-500 hover:bg-orange-100
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
