"use client";
import { ErrorState } from "@/app/components/ui/errorState";
import { LoadingState } from "@/app/components/ui/loandigstate";
import { useCompany } from "@/hook/useCompany";
import { Building2, Crown, Mail, Package, Phone } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CompanyDetailPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;
  const { loading, error, company, fetchCompanyId } = useCompany();

  //funcion para obtener datos de la empresa, se ejecuta cuando se renderiza lapagina
  useEffect(() => {
    fetchCompanyId(id);
  }, [id]); //si el id cambia, se vuelve a ejecutar la funcion

  if (loading) {
    <LoadingState title="Cargango datos de la empresa" description="Por favor espere un momento" />;
  }
  if (error) {
    <ErrorState title={error} onRetry={() => fetchCompanyId(id)} />;
  }
  if (!company) {
    return (
      <div className="w-full h-full bg-linear-to-r from-orange-100 via-orange-50/20 to-orange-100 flex flex-col justify-center overflow-hidden">
        <div className="p-8 text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Empresa no encontrada</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-6 py-2.5 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 text-white font-medium shadow-md cursor-pointer hover:scale-[1.02] transition-all duration-200"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen bg-linear-to-r from-orange-100 via-orange-50/20 to-orange-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-orange-500 to-orange-600 p-6">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Building2 className="w-6 h-6" />
              Detalles de la Empresa
            </h1>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Nombre */}
            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl">
              <Building2 className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500 font-medium">Nombre</p>
                <p className="text-lg font-semibold text-gray-900">{company.name}</p>
              </div>
            </div>

            {/* Teléfono */}
            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl">
              <Phone className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500 font-medium">Teléfono</p>
                <p className="text-lg font-semibold text-gray-900">{company.phone}</p>
              </div>
            </div>

            {/* Email del dueño */}
            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl">
              <Mail className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500 font-medium">Email del Dueño</p>
                <p className="text-lg font-semibold text-gray-900">{company.owner.email}</p>
              </div>
            </div>

            {/* Plan de suscripción */}
            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl">
              <Crown className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500 font-medium">Plan de Suscripción</p>
                <p className="text-lg font-semibold text-gray-900">{company.subscription_plan.name}</p>
              </div>
            </div>

            {/* Estado */}
            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl">
              <div className="mt-0.5">
                <div className={`w-3 h-3 rounded-full ${company.is_active ? "bg-green-500" : "bg-red-500"}`} />
              </div>
              <div>
                
                <p className="text-sm text-gray-500 font-medium">Estado</p>
                <p className="text-lg font-semibold text-gray-900">{company.is_active ? "Activo" : "Inactivo"}</p>
              </div>
            </div>

            {/* Botón volver */}
            <div className="pt-4">
              <button
                onClick={() => router.back()}
                className="w-full px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 text-white font-medium shadow-md cursor-pointer hover:scale-[1.02] transition-all duration-200"
              >
                Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
