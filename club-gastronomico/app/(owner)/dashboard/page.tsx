"use client";

import { ErrorState } from "@/app/components/ui/errorState";
import { LoadingState } from "@/app/components/ui/loandigstate";
import { useUsers } from "@/hook/useUsers";
import { CheckCircle, Eye, XCircle, Search, Users as UsersIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Pagination from "@/app/components/ui/pagination";
import { getUserParams } from "@/types/user.types";

export default function Users() {
  const { users, loading, pageLoading, error, fetchUser, search, goToPage, pagination } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const loadUsers = () => {
    fetchUser();
  };

  useEffect(() => {
    if (searchTerm.trim() === "") return;
    const timer = setTimeout(() => {
      const isEmail = searchTerm.includes("@");
      search(isEmail ? undefined : searchTerm, isEmail ? searchTerm : undefined);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm, search]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      loadUsers();
    }
  }, [searchTerm]);

  const getRoleBadgeClass = (roleName: string) => {
    const roleMap: Record<string, string> = {
      SuperAdmin: "bg-indigo-50 text-indigo-700",
      owner: "bg-blue-50 text-blue-700",
      employee: "bg-emerald-50 text-emerald-700",
    };
    return roleMap[roleName] || "bg-gray-50 text-gray-700";
  };

  const getRoleLabel = (roleName: string) => {
    const roleMap: Record<string, string> = {
      SuperAdmin: "Admin",
      owner: "Propietario",
      employee: "Empleado",
    };
    return roleMap[roleName] || roleName;
  };

  if (loading) {
    return <LoadingState title="Cargando empleados" description="Espere un momento por favor" />;
  }
  if (error) {
    return <ErrorState title={error} onRetry={loadUsers} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header con buscador a la derecha */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shrink-0">
            <UsersIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Empleados</h1>
            <p className="text-sm text-gray-500">Gestiona los empleados de tu negocio</p>
          </div>
        </div>

        {/* Buscador alineado a la derecha */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md"
          />
        </div>
      </div>

      {/* Línea decorativa */}
      <div className="h-0.5 w-full bg-linear-to-r from-indigo-500 via-purple-500 to-transparent rounded-full mb-6" />

      {/* Tabla */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-linear-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/80 transition-colors duration-150 group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-100 to-purple-100 flex items-center justify-center shrink-0">
                        <span className="text-xs font-semibold text-indigo-600">
                          {user.name.charAt(0)}
                          {user.lastname?.charAt(0) || ""}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {user.name} {user.lastname}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{user.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{user.company?.name || "—"}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeClass(user.role.name)}`}>
                      {getRoleLabel(user.role.name)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {user.is_active ? (
                        <>
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-sm font-medium text-emerald-600">Activo</span>
                        </>
                      ) : (
                        <>
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          <span className="text-sm font-medium text-red-600">Inactivo</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/users/${user.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 group-hover:shadow-lg"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Ver</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Estado vacío */}
        {users.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <UsersIcon className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">No se encontraron empleados</p>
          </div>
        )}
      </div>

      {/* Paginación */}
      {users.length > 0 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={(page) => {
              const params: getUserParams = {};
              goToPage(page, params);
            }}
            isLoading={pageLoading}
          />
        </div>
      )}
    </div>
  );
}
