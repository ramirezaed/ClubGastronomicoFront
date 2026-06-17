"use client";

import { useEffect, useState } from "react";
import { useUsers } from "@/hook/useUsers";
import { Users as UsersIcon, CheckCircle, XCircle, Eye } from "lucide-react";
import Link from "next/link";
import { ErrorState } from "@/app/components/ui/errorState";
import { getUserParams } from "@/types/user.types";
import { LoadingState } from "@/app/components/ui/loandigstate";

export default function UsersPage() {
  const { users, loading, error, fetchUser } = useUsers();
  const [filter, setFilter] = useState({
    is_active: "",
    role: "",
  });

  //funcion para obtener la lista completa de usuarios
  const loadUsers = () => {
    const params: getUserParams = {};
    if (filter.is_active !== "") {
      params.is_active = filter.is_active === "true";
    }
    if (filter.role) {
      params.role = filter.role;
    }
    fetchUser(params);
  };
  //funcion que se ejecuta cuando cambia alguno de los filtros
  useEffect(() => {
    loadUsers();
  }, [filter]);

  //funcion para mostrar los roles con etiquetas diferentes
  const getRoleBadgeClass = (roleName: string) => {
    const roleMap: Record<string, string> = {
      SuperAdmin: "bg-purple-100 text-purple-700",
      owner: "bg-blue-100 text-blue-700",
      employee: "bg-green-100 text-green-700",
    };
    return roleMap[roleName] || "bg-gray-100 text-gray-700";
  };

  if (error) {
    return (
      <ErrorState title="No pudimos cargar los usuarios" subtitle="Por favor intentelo mas tarde" onRetry={loadUsers} />
    );
  }

  if (loading) {
    return <LoadingState title="Cargando datos de usuarios" description="Espere un momento por favor" />;
  }

  return (
    <>
      <div className="w-full bg-white flex flex-col">
        {/* 1. Sección de Filtros (Superior) */}
        <div className="p-6 bg-gray-50/50 border-b border-gray-200/80">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Filtro de Estado */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
              <select
                value={filter.is_active}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    is_active: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none"
              >
                <option value="">Todos los estados</option>
                <option value="true">Activos</option>
                <option value="false">Inactivos</option>
              </select>
            </div>

            {/* Filtro de Rol */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Rol</label>
              <select
                value={filter.role}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    role: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none"
              >
                <option value="">Todos los roles</option>
                <option value="SuperAdmin">SuperAdmin</option>
                <option value="owner">Owner</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            {/* buscador */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Buscar</label>
              <select
                value={filter.role}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    role: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none"
              >
                <option value="">buscar usuario</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2. Sección de Tabla (Inferior) */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              {/* Encabezado con un fondo naranja claro sólido */}
              <tr className="bg-orange-100 border-b border-orange-200 text-sm font-semibold text-gray-700">
                <th className="py-3.5 px-6">Usuario</th>
                <th className="py-3.5 px-6">Email</th>
                <th className="py-3.5 px-6">Empresa</th>
                <th className="py-3.5 px-6">Rol</th>
                <th className="py-3.5 px-6">Estado</th>
                <th className="py-3.5 px-6 text-right">Acciones</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr
                  key={user.id}
                  /* Explicación de clases en Tailwind v4:
                   - bg-white: Fondo base para las filas pares.
                   - odd:bg-orange-50/60: Tiñe de naranja claro sutil e inequívoco las filas impares de forma nativa.
                   - hover:bg-orange-100/80: Resalta cualquier renglón al pasar el mouse por encima.
                */
                  className="bg-white odd:bg-orange-50/60 hover:bg-orange-100/80 transition-colors duration-150"
                >
                  {/* Datos del Usuario */}
                  <td className="py-3.5 px-6 font-medium text-gray-800">
                    {user.name} {user.lastname}
                  </td>

                  {/* Email */}
                  <td className="py-3.5 px-6 text-sm text-gray-600">{user.email}</td>

                  {/* Empresa */}
                  <td className="py-3.5 px-6 text-sm text-gray-600">{user.company?.name || "—"}</td>

                  {/* Rol */}
                  <td className="py-3.5 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeClass(user.role.name)}`}
                    >
                      {user.role.name}
                    </span>
                  </td>

                  {/* Estado con Badge plano */}
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-2">
                      {user.is_active ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-green-600">Activo</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span className="text-sm font-medium text-red-600">Inactivo</span>
                        </>
                      )}
                    </div>
                  </td>

                  {/* Acciones alineadas limpiamente a la derecha */}
                  <td className="py-3.5 px-6 text-right">
                    <Link
                      href={`/users/${user.id}`}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-orange-500 to-orange-600 text-white text-sm font-medium rounded-lg shadow-xs hover:scale-[1.02] transition-all duration-200"
                    >
                      <Eye className="w-4 h-4" />
                      Ver detalle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Estado vacío */}
          {users.length === 0 && (
            <div className="text-center py-16 bg-white">
              <p className="text-sm text-gray-400">No se encontraron usuarios en el sistema.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
