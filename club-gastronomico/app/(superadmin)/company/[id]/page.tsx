"use client";
import { ErrorState } from "@/app/components/ui/errorState";
import { LoadingState } from "@/app/components/ui/loandigstate";
import { useCompany } from "@/hook/useCompany";
import { usePlans } from "@/hook/usePlans";
import { Building2, Crown, Mail, Package, Phone } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CompanyDetailPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;
  const { loading, error, company, fetchCompanyId, changePlanCompany } = useCompany();
  const { plans, fetchPlans } = usePlans();
  const [selectedPlan, setSelectedPlan] = useState("");

  //funcion para obtener datos de la empresa, se ejecuta cuando se renderiza lapagina
  useEffect(() => {
    fetchCompanyId(id);
  }, [id]); //si el id cambia, se vuelve a ejecutar la funcion

  //muestra todos los planes
  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  // Actualizar el plan seleccionado cuando se cargue la empresa
  useEffect(() => {
    if (company?.subscription_plan?.id) {
      setSelectedPlan(company.subscription_plan.id);
    }
  }, [company]);

  const handleChangePlan = async () => {
    if (!company) return;
    if (selectedPlan === company.subscription_plan?.name) return;

    const response = await changePlanCompany(company.id, selectedPlan);
    if (response) {
      await fetchCompanyId(id);
    }
  };

  if (loading) {
    return <LoadingState title="Cargando datos de la empresa" description="Por favor espere un momento" />;
  }

  if (error) {
    return <ErrorState title={error} onRetry={() => fetchCompanyId(id)} />;
  }

  if (!company) {
    return (
      <div className="w-full min-h-screen bg-linear-to-r from-orange-100 via-orange-50/20 to-orange-100 flex flex-col justify-center overflow-hidden">
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
          {/* Header con ícono y título */}
          <div className="bg-linear-to-r from-orange-500 to-orange-600 p-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                  {company.name}
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-white/20 text-white backdrop-blur-sm">
                    {company.subscription_plan?.name || "Sin plan"}
                  </span>
                  <div className="flex items-center gap-1">
                    {company.is_active ? (
                      <>
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        <span className="text-sm font-medium text-white/90">Activo</span>
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        <span className="text-sm font-medium text-white/90">Inactivo</span>
                      </>
                    )}
                  </div>
                </h1>
              </div>
            </div>
          </div>

          <div className="h-0.5 w-full bg-linear-to-r from-orange-500 via-orange-300 to-orange-500" />

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Información de contacto */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 rounded-full bg-linear-to-r from-orange-500 to-orange-600" />
                Información de Contacto
              </h2>
              <div className="space-y-3">
                {/* Nombre */}
                <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl">
                  <Building2 className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Nombre</p>
                    <p className="text-lg font-semibold text-gray-900">{company.name}</p>
                  </div>
                </div>

                {/* Teléfono */}
                <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl">
                  <Phone className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Teléfono</p>
                    <p className="text-lg font-semibold text-gray-900">{company.phone}</p>
                  </div>
                </div>

                {/* Email del dueño */}
                <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl">
                  <Mail className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Email del Dueño</p>
                    <p className="text-lg font-semibold text-gray-900">{company.owner?.email || "No disponible"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Plan de suscripción - con selector y botón */}
            <div className="rounded-2xl bg-orange-50 p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-800">Plan de Suscripción</h3>
                  <p className="text-sm text-gray-500 mt-1">Cambia el plan de suscripción de esta empresa.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <select
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="
                      w-full
                      sm:min-w-50
                      md:min-w-50
                      px-4 py-3
                      rounded-xl
                      border-2 border-orange-200
                      bg-white
                      text-gray-700
                      font-medium
                      shadow-sm
                      focus:border-orange-500
                      focus:ring-4
                      focus:ring-orange-100
                      outline-none
                      transition-all
                      cursor-pointer
                    "
                  >
                    <option value="" disabled>
                      Seleccionar plan
                    </option>
                    {plans.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.name}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={handleChangePlan}
                    disabled={selectedPlan === company.subscription_plan?.id || !selectedPlan}
                    className="
                      px-6 py-3
                      rounded-xl
                      bg-linear-to-r
                      from-orange-500
                      to-orange-600
                      text-white
                      font-medium
                      shadow-md
                      hover:scale-[1.02]
                      transition-all
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                      whitespace-nowrap
                      cursor-pointer
                    "
                  >
                    Cambiar plan
                  </button>
                </div>
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

            {/* Línea divisoria */}
            <div className="h-0.5 w-full bg-linear-to-r from-orange-100 via-orange-300 to-orange-100 rounded-full my-4" />

            {/* Botones */}
            <div className="flex flex-col sm:flex-row sm:justify-center gap-3 sm:gap-6">
              <button
                onClick={() => router.back()}
                className="
                  w-full sm:w-auto
                  px-6 py-2.5
                  rounded-xl
                  bg-linear-to-r
                  from-orange-500
                  to-orange-600
                  text-white
                  font-medium
                  shadow-md
                  hover:scale-[1.02]
                  transition-all
                  duration-200
                  cursor-pointer
                "
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
