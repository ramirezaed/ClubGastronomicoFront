"use client";
import { ErrorState } from "@/app/components/ui/errorState";
import { LoadingState } from "@/app/components/ui/loandigstate";
import { useRoles } from "@/hook/useRoles";
import { useEffect } from "react";
import Link from "next/link";
import { Eye, Plus, Shield, CheckCircle, XCircle } from "lucide-react";

export default function Roles() {
  const { roles, loading, error, fetchRoles } = useRoles();

  //ejecuta la funcion loadRoles cuando se renderiza la pagina
  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

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
    return <ErrorState title={error} subtitle="Por favor intentelo mas tarde" onRetry={() => fetchRoles} />;
  }
  //muestra la barra de carga
  if (loading) {
    return <LoadingState title="Cargando Roles" description="Espere un momento por favor" />;
  }

  return (
    <div className="h-full flex flex-col bg-linear-to-r from-orange-100 via-orange-50 to-orange-100">
      {/* Header con título y botón Agregar */}
      <div className="shrink-0 p-3.5 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-r from-orange-500 to-orange-600 shadow-lg flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-[Poppins] font-extrabold text-gray-800">Roles</h1>
              <p className="text-gray-500 text-sm">Gestiona los roles del sistema</p>
            </div>
          </div>
          <Link
            href="/roles/create"
            className="
              inline-flex items-center gap-2
              px-5 py-2.5
              rounded-xl
              bg-linear-to-r from-orange-500 to-orange-600
              text-white font-medium text-sm
              shadow-md
              hover:scale-[1.03] hover:shadow-lg
              transition-all duration-200
            "
          >
            <Plus className="w-4 h-4" />
            Nuevo rol
          </Link>
        </div>
      </div>

      {/* 2. Sección de Tabla (Scrollable) */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="h-full overflow-y-auto overflow-x-auto ">
          <table className="w-full text-left border-collapse  ">
            <thead>
              {/* Encabezado con fondo naranja */}
              <tr className="bg-linear-to-r  from-orange-100 via-orange-50 to-orange-100 text-sm font-semibold  text-gray-700 sticky top-0 z-10">
                <th className="py-3.5 px-6">Nombre</th>
                <th className="py-3.5 px-6">Descripción</th>
                <th className="py-3.5 px-6">Estado</th>
                <th className="py-3.5 px-6 text-right">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {roles.map((role) => (
                <tr
                  key={role.id}
                  className="bg-white odd:bg-orange-50/60 hover:bg-orange-100/80 transition-colors duration-150 cursor-pointer"
                >
                  {/* Nombre del Rol */}
                  <td className="py-3.5 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeClass(role.name)}`}>
                      {role.name === "SuperAdmin"
                        ? "Administrador"
                        : role.name === "owner"
                          ? "Propietario"
                          : role.name === "employee"
                            ? "Empleado"
                            : role.name}
                    </span>
                  </td>

                  {/* Descripción */}
                  <td className="py-3.5 px-6 text-sm text-gray-600">{role.description || "—"}</td>

                  {/* Estado */}
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-2">
                      {role.is_active ? (
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

                  {/* Acciones */}
                  <td className="py-3.5 px-6 text-right">
                    <Link
                      href={`/roles/${role.id}`}
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
          {roles.length === 0 && (
            <div className="text-center py-16 bg-white">
              <p className="text-sm text-gray-400">No se encontraron roles en el sistema.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
