"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/hook/useUser";
import { StatusToggle } from "@/app/components/ui/togleStatus";
import { DeleteButton } from "@/app/components/ui/DeleteButton";
import { ArrowLeft, User, Mail, Building, Shield, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { LoadingState } from "@/app/components/ui/loandigstate";

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { user, loading, error, fetchById, toogglestatus, deleteUser } = useUser();

  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Cargar datos iniciales
  useEffect(() => {
    if (id) {
      fetchById(id);
    }
  }, [id, fetchById]);

  const handleToggleStatus = async () => {
    if (!user) return;
    const response = await toogglestatus(user.id, user.is_active);
    if (response) {
      await fetchById(id);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteUser(id);
      router.push("/personal");
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : "Error al eliminar el usuario");
      throw error;
    }
  };

  const getRoleBadgeClass = (roleName: string) => {
    const roleMap: Record<string, string> = {
      SuperAdmin: "bg-indigo-50 text-indigo-700 border-indigo-200",
      owner: "bg-blue-50 text-blue-700 border-blue-200",
      employee: "bg-emerald-50 text-emerald-700 border-emerald-200",
    };
    return roleMap[roleName] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  const getRoleLabel = (roleName: string) => {
    const roleMap: Record<string, string> = {
      SuperAdmin: "Administrador",
      owner: "Propietario",
      employee: "Empleado",
    };
    return roleMap[roleName] || roleName;
  };

  const getInitials = (name: string, lastname?: string) => {
    const first = name?.charAt(0) || "";
    const last = lastname?.charAt(0) || "";
    return `${first}${last}`.toUpperCase();
  };

  if (loading) {
    return <LoadingState title="Cargando usuario" description="Espere un momento por favor" />;
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl border border-red-200 bg-white p-8 text-center shadow-lg">
          <XCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
          <h3 className="mb-2 text-lg font-semibold text-slate-800">Error al cargar el usuario</h3>
          <p className="mb-6 text-sm text-slate-600">{error}</p>
          <button
            onClick={() => fetchById(id)}
            className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <User className="mx-auto mb-3 h-12 w-12 text-slate-300" />
          <p className="font-medium text-slate-500">Usuario no encontrado</p>
          <button
            onClick={() => router.back()}
            className="mt-4 inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al listado
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-4xl p-4 sm:p-6">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="p-6">
          {/* Mensaje de error al eliminar */}
          {deleteError && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-red-700 border border-red-200">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">{deleteError}</span>
            </div>
          )}

          {/* Header con nombre y avatar */}
          <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-indigo-100 to-purple-100">
                <span className="text-2xl font-semibold text-indigo-600">{getInitials(user.name, user.lastname)}</span>
              </div>
              <div>
                <h1 className="text-3xl font-light text-slate-700 tracking-wide">
                  {user.name} <span className="font-medium text-slate-800">{user.lastname}</span>
                </h1>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium ${getRoleBadgeClass(user.role?.name || "employee")}`}
              >
                <Shield className="h-3.5 w-3.5" />
                {getRoleLabel(user.role?.name || "employee")}
              </span>
            </div>
          </div>

          {/* Grid de información */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Email */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="mb-1 flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400" />
                <p className="text-xs uppercase tracking-wider text-slate-500">Email</p>
              </div>
              <p className="text-lg font-medium text-slate-800">{user.email}</p>
            </div>

            {/* Empresa */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="mb-1 flex items-center gap-2">
                <Building className="h-4 w-4 text-slate-400" />
                <p className="text-xs uppercase tracking-wider text-slate-500">Empresa</p>
              </div>
              <p className="text-lg font-medium text-slate-800">{user.company?.name || "Sin empresa asignada"}</p>
            </div>
          </div>

          {/* Estado del usuario */}
          <div className="mt-4 flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div>
              <h3 className="font-medium text-slate-800">Estado del usuario</h3>
              <p className="mt-1 text-sm text-slate-500">Activa o desactiva el acceso de este usuario al sistema.</p>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <StatusToggle isActive={user.is_active} onToggle={handleToggleStatus} />
              <span className="flex items-center gap-1.5 text-sm font-medium text-slate-600 min-w-17.5">
                {user.is_active ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    Activo
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-red-500" />
                    Inactivo
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6">
            <button
              onClick={() => router.back()}
              className="inline-flex hover:cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </button>

            <DeleteButton onDelete={handleDelete} itemName={`${user.name} ${user.lastname}`} />
          </div>
        </div>
      </div>
    </main>
  );
}
