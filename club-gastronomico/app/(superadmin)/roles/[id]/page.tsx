"use client";

import { ErrorState } from "@/app/components/ui/errorState";
import { LoadingState } from "@/app/components/ui/loandigstate";
import { useRole } from "@/hook/useRole";
import { ArrowLeft, CheckCircle, Shield, XCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function roleDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { role, loading, error, fetchRoleById } = useRole();

  //carga los datos del rol cuando se renderiza la pagina
  useEffect(() => {
    fetchRoleById(id);
  }, [id]); //cuando cambia el id se vuelve a ejecutar la funcion

  //si esta cargando muestra la barra
  if (loading) {
    return <LoadingState title="Cargando datos del Rol" description="Espere un momento por favor" />;
  }

  //si hay un error lanza el error que viene desde la api
  if (error) {
    return <ErrorState title={error} onRetry={() => fetchRoleById(id)} />;
  }

  if (!role) {
    return (
      <div className="h-screen flex flex-col bg-linear-to-r from-orange-100 via-orange-50 to-orange-100">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No contamos con datos del rol</p>
            <button
              onClick={() => router.back()}
              className="mt-4 px-6 py-2.5 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 text-white font-medium shadow-md hover:scale-[1.02] transition-all duration-200"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-linear-to-r from-orange-100 via-orange-50 to-orange-100 flex flex-col">
      {/* Header con ícono y título */}
      <div className="p-8 py-5">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-r from-orange-500 to-orange-600 shadow-lg flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-[Poppins] font-extrabold text-gray-800">Gestion de Rol</h1>
          </div>
        </div>
      </div>

      {/* Contenido del rol */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="py-1.5 max-w-3xl mx-auto">
          <div className="h-0.5 w-full bg-linear-to-r from-orange-100 via-orange-500 to-orange-100 rounded-full mb-8" />

          {/* Nombre del rol */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-500 mb-1">Nombre</label>
            <div className="bg-white/80 px-4 py-3 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-700">{role?.name}</p>
            </div>
          </div>

          {/* Descripción */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-500 mb-1">Descripción</label>
            <div className="bg-white/80 px-4 py-3 rounded-lg border border-gray-200 min-h-15">
              <p className="text-sm text-gray-700">{role?.description || "Sin descripción"}</p>
            </div>
          </div>

          {/* Estado */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-500 mb-1">Estado</label>
            <div className="bg-white/80 px-4 py-3 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2">
                {role?.is_active ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-green-600">Activo</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-medium text-red-600">Inactivo</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
