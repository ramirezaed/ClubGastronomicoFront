"use client";
import { DeleteButton } from "@/app/components/ui/DeleteButton";
import { ErrorState } from "@/app/components/ui/errorState";
import { LoadingState } from "@/app/components/ui/loandigstate";
import Modal from "@/app/components/ui/Modal";
import { useCompany } from "@/hook/useCompany";
import { usePlans } from "@/hook/usePlans";
import { Building2, Home, Mail, Package } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CompanyDetailPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;
  const { loading, error, company, fetchCompanyId, changePlanCompany, deleteCompany } = useCompany();
  const { plans, fetchPlans } = usePlans();
  const [selectedPlan, setSelectedPlan] = useState(company?.subscription_plan?.id || "");

  const [modalOpen, setModalOpen] = useState(false); //seteo el modal, por defecto false (cerrado)
  const [modalMessage, setModalMessage] = useState(""); //mensaje del modal, por defcto vacio

  //funcion para obtener datos de la empresa, se ejecuta cuando se renderiza lapagina
  useEffect(() => {
    fetchCompanyId(id);
  }, [id, fetchCompanyId]); //si el id cambia, se vuelve a ejecutar la funcion

  useEffect(() => {
    if (company) {
      setSelectedPlan(company?.subscription_plan?.id);
    }
  }, [company]);

  //muestra todos los planes
  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  //funciona para manejar el cambio de plan de una empresa
  const handleChangePlan = async () => {
    if (!company) return;
    if (selectedPlan === company.subscription_plan?.name) return;

    const response = await changePlanCompany(company.id, selectedPlan);
    if (response) {
      await fetchCompanyId(id);
    }
  };

  // funcion para eliminar una empresa
  const handleDelete = async () => {
    if (!company) return;
    const response = await deleteCompany(company.id);
    if (response) {
      setModalMessage("La compañía ha sido eliminada exitosamente");
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    router.push("/company");
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
    <div className="w-full min-h-screen bg-linear-to-r from-orange-100 via-orange-50 to-orange-100 flex flex-col overflow-hidden">
      {/* Header con ícono y título */}
      <div className="p-8 py-5">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-r from-orange-500 to-orange-600 shadow-lg flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-white" />
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-[Poppins] font-extrabold text-gray-800 flex items-center gap-3 flex-wrap">
              {company.name}
              <span className={`px-3 py-1 rounded-full text-sm font-semibold bg-orange-100 text-orange-700`}>
                {company.subscription_plan?.name || "Sin plan"}
              </span>
              <div className="flex items-center gap-1">
                {company.is_active ? (
                  <>
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm font-medium text-green-600">Activo</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-sm font-medium text-red-600">Inactivo</span>
                  </>
                )}
              </div>
            </h1>
          </div>
        </div>
      </div>

      <div className="h-0.5 w-10/12 bg-linear-to-r from-orange-100 via-orange-500 to-orange-100 rounded-full mt-1 mx-auto mb-4" />

      <div className="p-2 space-y-3 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Información de contacto */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 rounded-full bg-linear-to-r from-orange-500 to-orange-600" />
              Información de Contacto
            </h2>
            <div className="space-y-0.5">
              <div className="flex items-center gap-3 p-4 rounded-xl">
                <Building2 className="w-5 h-5 text-gray-400 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Nombre</p>
                  <p className="text-gray-800 font-medium break-all">{company.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl">
                <Home className="w-5 h-5 text-gray-400 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Dirección</p>
                  <p className="text-gray-800 font-medium break-all">{company.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl">
                <Mail className="w-5 h-5 text-gray-400 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Email del Dueño</p>
                  <p className="text-gray-800 font-medium break-all">{company.owner?.email || "No disponible"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Información de empresa */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 rounded-full bg-linear-to-r from-orange-500 to-orange-600" />
              Información de Suscripción
            </h2>
            <div className="space-y-0.5">
              <div className="flex items-center gap-3 p-4 rounded-xl">
                <div className="w-5 h-5 text-gray-400 shrink-0 flex items-center justify-center">
                  <span className="text-lg">📋</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Plan Actual</p>
                  <p className="text-gray-800 font-medium">{company.subscription_plan?.name || "Sin plan"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plan de suscripción - con selector y botón */}
      <div className="rounded-2xl p-4 mx-4 md:mx-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-800">Plan de Suscripción</h3>
            <p className="text-sm text-gray-500 mt-1">Cambia el plan de suscripción de esta empresa.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="
                w-full
                sm:min-w-70
                lg:min-w-[320px]
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
                  {plan.name} {plan.price ? `- $${plan.price}` : ""}
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

      {/* Línea divisoria */}
      <div className="px-4 md:px-8 py-4 md:py-5 mt-3">
        <div className="h-0.5 w-10/12 bg-linear-to-r from-orange-100 via-orange-500 to-orange-100 rounded-full mt-1 mb-4 mx-auto" />

        {/* Botones */}
        <div className="mt-2 flex flex-col sm:flex-row sm:justify-center gap-3 sm:gap-6">
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
              order-2 sm:order-1
            "
          >
            Volver
          </button>

          <div className="flex flex-col sm:flex-row sm:justify-center gap-3 sm:gap-6">
            <DeleteButton loading={loading} itemName={`la empresa ${company.name}`} onDelete={handleDelete} />
          </div>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={handleCloseModal} title="¡Compañía Eliminada!" message={modalMessage} />
    </div>
  );
}
