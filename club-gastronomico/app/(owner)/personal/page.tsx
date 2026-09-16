"use client";

import { ErrorState } from "@/app/components/ui/errorState";
import { LoadingState } from "@/app/components/ui/loandigstate";
import { useUsers } from "@/hook/useUsers";
import { CheckCircle, Eye, Search, Users as UsersIcon, XCircle, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Pagination from "@/app/components/ui/pagination";
import { getUserParams } from "@/types/user.types";

interface FilterState {
  is_active: string;
}

export default function Users() {
  const { users, loading, pageLoading, error, fetchUser, search, goToPage, pagination } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [filter, setFilter] = useState<FilterState>({
    is_active: "",
  });

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const loadUsers = () => {
    fetchUser();
  };

  // Filtro local de usuarios por búsqueda y estado
  useEffect(() => {
    let filtered = users;

    // Filtrar por estado
    if (filter.is_active !== "") {
      const isActive = filter.is_active === "true";
      filtered = filtered.filter((user) => user.is_active === isActive);
    }

    // Filtrar por búsqueda (nombre o email)
    if (searchTerm.trim() !== "") {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(search) ||
          user.lastname?.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search),
      );
    }

    setFilteredUsers(filtered);
  }, [searchTerm, filter, users]);

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
    <div className="p-4 sm:p-6">
      {/* Filtros y Buscador - ESTILO MENÚ */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        {/* Filtro de Estado - Izquierda */}
        <div className="w-full sm:w-64">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
          <select
            value={filter.is_active}
            onChange={(e) =>
              setFilter({
                ...filter,
                is_active: e.target.value,
              })
            }
            className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
          >
            <option value="">Todos los estados</option>
            <option value="true">Activos</option>
            <option value="false">Inactivos</option>
          </select>
        </div>

        {/* Botón Agregar Usuario */}
        <div className="w-full sm:w-auto">
          <Link href="/personal/create">
            <button className="w-full sm:w-auto border border-slate-200 hover:cursor-pointer px-6 py-2 bg-white text-indigo-950 rounded-xl hover:bg-indigo-10 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
              <Plus className="w-5 h-5" />
              <span>Agregar Usuario</span>
            </button>
          </Link>
        </div>

        {/* Buscador - Derecha */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white outline-none"
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {filteredUsers.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Apellido
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Empresa
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-600">{user.name}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-600">{user.lastname}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-600">{user.email}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-600">{user.company?.name || "—"}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex px-2 py-0.5 text-xs rounded-full ${getRoleBadgeClass(user.role.name)}`}
                        >
                          {getRoleLabel(user.role.name)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center">
                          <span
                            className={`flex items-center gap-1 text-xs font-medium ${
                              user.is_active ? "text-emerald-600" : "text-red-600"
                            }`}
                          >
                            {user.is_active ? (
                              <CheckCircle className="w-3.5 h-3.5" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5" />
                            )}
                            {user.is_active ? "Activo" : "Inactivo"}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center">
                          <Link
                            href={`/personal/${user.id}`}
                            className="inline-flex items-center hover:cursor-pointer gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Ver detalle</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer con paginación */}
            {users.length > 0 && pagination.totalPages > 0 && (
              <div className="shrink-0 flex flex-col sm:flex-row items-center justify-center gap-10 px-6 py-5.5 border-t border-slate-200">
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
          </>
        ) : (
          <div className="py-12 text-center">
            {searchTerm ? (
              <>
                <UsersIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">No se encontraron resultados</p>
                <p className="text-sm text-slate-400 mt-1">
                  No hay usuarios que coincidan con &quot;{searchTerm}&quot;
                </p>
              </>
            ) : filter.is_active !== "" ? (
              <>
                <UsersIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">
                  No hay usuarios {filter.is_active === "true" ? "activos" : "inactivos"}
                </p>
              </>
            ) : (
              <>
                <UsersIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">No hay usuarios disponibles</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
