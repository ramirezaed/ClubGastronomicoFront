"use client";

import { ErrorState } from "@/app/components/ui/errorState";
import { LoadingState } from "@/app/components/ui/loandigstate";
import { usePlans } from "@/hook/usePlans";
import { CheckCircle, Crown, Edit3, Plus, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function PlansPage() {
  const { plans, loading, error, fetchPlans } = usePlans();

  //se ejecuta automaticamente dps de renderizar el componente
  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  // funcion para obtener despues de preionar el boton reintentar
  const loadPlans = () => {
    fetchPlans();
  };

  if (loading) {
    return <LoadingState title="Cargando lista de planes" description="Espere un momento por favor" />;
  }
  if (error) {
    return <ErrorState title={error} onRetry={loadPlans} />;
  }

  return (
    <div className="relative min-h-screen bg-linear-to-r from-orange-100 via-orange-50 to-orange-100 p-4 sm:p-6 lg:p-8 overflow-hidden">
      {/* Contenido Principal */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header de la sección */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight font-[Poppins]">
              Planes Disponibles
            </h1>
            <p className="text-s text-gray-500 mt-1 font-[Poppins]">Gestiona las suscripciones y tarifas.</p>
          </div>

          {/* Botón Agregar Nuevo Plan */}

          <Link
            href={`/planes/newPlan/`}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            <span>Nuevo plan</span>
          </Link>
        </div>

        {/* Listado de Planes (Estrictamente 2 columnas) */}
        {plans.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-xl max-w-md mx-auto border-2 border-orange-500">
            <p className="text-gray-500 font-medium">No existen planes registrados actualmente.</p>
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="relative overflow-hidden bg-white rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:translate-y-1 flex flex-col justify-between group border-2 border-orange-500"
              >
                <div>
                  {/* Encabezado: Icono Corona y Estado (Verde / Rojo) */}
                  <div className="flex items-center justify-between mb-6">
                    <Crown className="w-10 h-10 text-orange-500 drop-shadow-xs" />

                    {/* Badge de estado dinámico (Verde para activo, Rojo para inactivo) */}
                    <div className="text-xs font-bold">
                      {plan.is_active ? (
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 border border-green-300 px-3 py-1.5 rounded-full shadow-xs">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Activo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 border border-red-300 px-3 py-1.5 rounded-full shadow-xs">
                          <XCircle className="w-4 h-4 text-red-600" />
                          Inactivo
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Nombre del Plan (plan.name) */}
                  <h2 className="text-3xl font-black text-center text-gray-900 mb-4 tracking-tight font-[Poppins]">
                    {plan.name}
                  </h2>

                  {/* Precio Grande Estilo Tarjeta (plan.price) */}
                  <div className="flex items-baseline justify-center gap-1 mb-6">
                    <span className="text-5xl font-black text-gray-900 tracking-tight font-[Poppins]">
                      ${plan.price}
                    </span>
                    <span className="text-sm font-semibold text-gray-500  font-[Poppins]">/mes</span>
                  </div>

                  {/* Descripción del Plan (plan.description) */}
                  <p className="text-center text-gray-800 text-sm leading-relaxed mb-8 font-medium px-2 ">
                    {plan.description}
                  </p>
                </div>

                {/* Acción: Botón Editar Plan (Naranja con Degradado) */}
                <div className="pt-4 border-t border-gray-100 mt-auto">
                  <Link
                    href={`/planes/${plan.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 text-white font-bold shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Editar Plan</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
