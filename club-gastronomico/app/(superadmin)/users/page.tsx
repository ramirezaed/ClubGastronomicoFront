"use client";

import { useEffect, useState } from "react";
import { useUsers } from "@/hook/useUsers";
import { Users as UsersIcon, CheckCircle, XCircle, Eye, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { ErrorState } from "@/app/components/ui/errorState";

export default function UsersPage() {
  const { users, loading, error, fetchUser } = useUsers();

  const [filter, setFilter] = useState({
    is_active: "",
    role: "",
  });

  useEffect(() => {
    const params: any = {};
    if (filter.is_active !== "") {
      params.is_active = filter.is_active === "true";
    }
    if (filter.role) {
      params.role = filter.role;
    }
    fetchUser(params);
  }, [filter, fetchUser]);

  //funcion para mostrar lso roles
  const getRoleBadgeClass = (roleName: string) => {
    const roleMap: Record<string, string> = {
      SuperAdmin: "bg-purple-100 text-purple-700",
      owner: "bg-blue-100 text-blue-700",
      employee: "bg-green-100 text-green-700",
    };

    return roleMap[roleName] || "bg-gray-100 text-gray-700";
  };

  //componente muestra error cuando no hay respuesta de la api
  if (error) {
    return <ErrorState title=" No pudimos cargar los usuarios" onRetry={() => fetchUser} />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-amber-50 p-8 relative">
      {/* Fondo con texto repetido */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl font-bold text-gray-800 whitespace-nowrap"
              style={{
                top: `${(i * 120) % 1000}px`,
                left: `${(i * 80) % 1000}px`,
                transform: "rotate(12deg)",
                opacity: i % 3 === 0 ? 0.2 : i % 3 === 1 ? 0.4 : 0.1,
              }}
            >
              Club Gastronómico
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          <div className="h-1 bg-linear-to-r from-orange-500 to-orange-600" />

          {/* Header */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Usuarios</h1>

                <p className="text-gray-500 mt-1">Gestiona los usuarios del sistema</p>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-linear-to-r from-orange-500 to-orange-600 shadow-lg flex items-center justify-center">
                <UsersIcon className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="p-8 border-b border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>

                <select
                  value={filter.is_active}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      is_active: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border-gray-200 bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  <option value="">Todos los estados</option>
                  <option value="true">Activos</option>
                  <option value="false">Inactivos</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rol</label>

                <select
                  value={filter.role}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      role: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border-gray-200 bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  <option value="">Todos los roles</option>
                  <option value="SuperAdmin">SuperAdmin</option>
                  <option value="owner">Owner</option>
                  <option value="employee">Employee</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tabla */}
          <div className="p-8">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-pulse">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-linear-to-r from-orange-500 to-orange-600 shadow-lg mb-4" />

                  <p className="text-gray-600">Cargando usuarios...</p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-4 px-4">Usuario</th>

                      <th className="text-left py-4 px-4">Email</th>

                      <th className="text-left py-4 px-4">Empresa</th>

                      <th className="text-left py-4 px-4">Rol</th>

                      <th className="text-left py-4 px-4">Estado</th>

                      <th className="text-left py-4 px-4">Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          {user.name} {user.lastname}
                        </td>

                        <td className="py-4 px-4">{user.email}</td>

                        <td className="py-4 px-4">{user.company?.name || "—"}</td>

                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeClass(
                              user.role.name,
                            )}`}
                          >
                            {user.role.name}
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            {user.is_active ? (
                              <>
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span className="text-green-600">Activo</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-5 h-5 text-red-500" />
                                <span className="text-red-600">Inactivo</span>
                              </>
                            )}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <Link
                            href={`/users/${user.id}`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-xl shadow-md hover:scale-[1.02] transition-all"
                          >
                            <Eye className="w-4 h-4" />
                            Ver detalle
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {users.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No se encontraron usuarios</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
