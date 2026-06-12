// src/components/superadmin/UserTable.tsx
"use client";

import { User } from "@/types/user.types";
import { useState } from "react";

interface UserTableProps {
  users: User[];
  loading: boolean;
  onToggleStatus: (id: string, currentStatus: boolean) => Promise<void>;
  onChangeRole: (id: string, roleId: string) => Promise<void>;
}

export const UserTable = ({ users, loading, onToggleStatus, onChangeRole }: UserTableProps) => {
  const [changingRole, setChangingRole] = useState<string | null>(null);

  const getRoleBadgeColor = (roleName: string) => {
    switch (roleName) {
      case "SuperAdmin":
        return "bg-purple-100 text-purple-800";
      case "owner":
        return "bg-blue-100 text-blue-800";
      case "employee":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (users.length === 0) {
    return <div className="text-center py-12 text-gray-500">No hay usuarios para mostrar</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empresa</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {user.name} {user.lastname}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs rounded-full ${getRoleBadgeColor(user.role.name)}`}>
                  {user.role.name}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{user.company?.name || "-"}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    user.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.is_active ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <div className="flex gap-2">
                  <button
                    onClick={() => onToggleStatus(user.id, user.is_active)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                      user.is_active
                        ? "bg-red-100 text-red-700 hover:bg-red-200"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                  >
                    {user.is_active ? "Desactivar" : "Activar"}
                  </button>
                  <select
                    value={user.role.id}
                    onChange={(e) => {
                      setChangingRole(user.id);
                      onChangeRole(user.id, e.target.value).finally(() => setChangingRole(null));
                    }}
                    disabled={changingRole === user.id}
                    className="px-2 py-1 text-xs border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="69c9a0187090d7834a31d6e5">SuperAdmin</option>
                    <option value="69c9a0187090d7834a31d6e5">Owner</option>
                    <option value="69c9a0187090d7834a31d6e5">Employee</option>
                  </select>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
