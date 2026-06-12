"use client";

import { useEffect, useState } from "react";

import { useUsers } from "@/hook/useUsers";
import { UserTable } from "@/app/components/admin/userTable";
import { Users as UsersIcon } from "lucide-react";
import Link from "next/link";

export default function UsersPage() {
  // const { users, loading, error, fetchUsers, toggleStatus, changeRole } = useUsers();
  const { users, loading, error, fetchUser } = useUsers();
  const [filter, setFilter] = useState({ is_active: "", role: "" });

  useEffect(() => {
    const params: any = {};
    if (filter.is_active !== "") params.is_active = filter.is_active === "true";
    if (filter.role) params.role = filter.role;
    fetchUser(params);
  }, [filter, fetchUser]);
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Usuarios</h1>
          <p className="text-gray-500 mt-1">Gestiona los usuarios del sistema</p>
        </div>
        <div className="bg-orange-100 p-3 rounded-xl">
          <UsersIcon className="w-6 h-6 text-orange-600" />
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm p-4 flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
          <select
            value={filter.is_active}
            onChange={(e) => setFilter({ ...filter, is_active: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Todos</option>
            <option value="true">Activos</option>
            <option value="false">Inactivos</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
          <select
            value={filter.role}
            onChange={(e) => setFilter({ ...filter, role: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Todos</option>
            <option value="SuperAdmin">SuperAdmin</option>
            <option value="owner">Owner</option>
            <option value="employee">Employee</option>
          </select>
        </div>
      </div>

      {/* Error */}
      {error && <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">{error}</div>}

      {/* Tabla */}
      {/* <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <UserTable users={users} loading={loading} onToggleStatus={toggleStatus} onChangeRole={changeRole} />
      </div> */}

      <div className="bg-white rounded-xl shadow-sm p-4">
        {loading ? (
          <p>Cargando usuarios...</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id} className="flex justify-between items-center py-2 border-b">
                <span>
                  {user.name} - {user.email} {user.lastname} {user.company?.name}
                </span>

                <Link href={`/users/${user.id}`} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Ver detalle
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
