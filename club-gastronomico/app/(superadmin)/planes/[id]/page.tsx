"use client";

import { DeleteButton } from "@/app/components/ui/DeleteButton";
import { usePlan } from "@/hook/useplan";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DollarSign, FileText, Save, Package } from "lucide-react";
import Modal from "@/app/components/ui/Modal";
import { ErrorState } from "@/app/components/ui/errorState";
import { LoadingState } from "@/app/components/ui/loandigstate";

export default function PlanDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { plan, loading, error, deletePlan, fetchPlanById, update } = usePlan();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  //seteo el estado de los campos para modificar
  const [price, setPrice] = useState(plan?.price?.toString() || "");
  const [description, setDescription] = useState(plan?.description || "");
  const [formError, setFormError] = useState("");

  //obtiene los datos del plan cuando se renderiz la pagina
  useEffect(() => {
    fetchPlanById(id);
  }, [id, fetchPlanById]); //cuando cambia el id del plan se vuele a ejecutar la funcion
  useEffect(() => {
    if (plan) {
      setDescription(plan.description || "");
      setPrice(plan.price || "");
    }
  }, [plan]);

  //fucnion para eliminar un plan
  const handleDelete = async () => {
    if (!plan) return;
    const response = await deletePlan(plan.id);
    if (response) {
      setModalMessage(response.message || "Plan eliminado exitosamente");
      setModalOpen(true);
    }
  };

  //funcion para modificar los datos del plan
  const handleUpdate = async () => {
    setFormError("");
    //si el precio o la description estan vacias lanza error
    if (!price.trim() || !description.trim()) {
      setFormError("Todos los campos son obligatorios");
      return;
    }
    //si se ingresa un precio para el plan menor a 0
    if (Number(price) < 0) {
      setFormError("El precio no puede ser menor a 0");
      return;
    }

    const response = await update(id, price, description);
    if (response) {
      await fetchPlanById(id);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    router.push("/planes");
  };

  //si esta cargando muestra la barra
  if (loading) {
    return <LoadingState title="Cargando datos del plan" description="Espere un momento por favor" />;
  }

  //si hay un error lanza el error que viene desde la api
  if (error) {
    return <ErrorState title={error} onRetry={() => fetchPlanById(id)} />;
  }

  if (!plan) {
    return (
      <div className="w-full h-full bg-linear-to-r from-orange-100 via-orange-50/20 to-orange-100 flex flex-col justify-center overflow-hidden">
        <div className="p-8 text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Plan no encontrado</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-6 py-2.5 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 text-white font-medium shadow-md hover:scale-[1.02] transition-all duration-200"
          >
            Volver
          </button>
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
            <Package className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-[Poppins] font-extrabold text-gray-800 flex items-center gap-3">
              Plan {plan.name}
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  plan.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {plan.is_active ? "Activo" : "Inactivo"}
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <div className="p-2 space-y-3 flex flex-col items-center">
        <div className="h-0.5 w-10/12  bg-linear-to-r from-orange-100 via-orange-500 to-orange-100 rounded-full  mb-8" />
        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">
            <span className="flex items-center gap-2">
              <FileText className="w- h-4 text-gray-400" />
              Descripción
            </span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-xl px-4 py-3 rounded-xl border-2 border-orange-600 bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all resize-none"
            placeholder="Ingresa la descripción del plan"
          />
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-medium  text-gray-700 mb-2">
            <span className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-400" />
              Precio
            </span>
          </label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-xl pl-12 pr-4 py-3 rounded-xl border-2 border-orange-600 bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              placeholder="Ingresa el precio"
            />
          </div>
        </div>

        {formError && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-600 p-4 rounded-xl">{formError}</div>
        )}

        {/* Botón Guardar cambios */}
        <button
          onClick={handleUpdate}
          className="
            w-xl
            inline-flex items-center justify-center gap-2
            px-6 py-3
            rounded-xl
            bg-linear-to-r from-orange-500 to-orange-600
            text-white font-medium
            shadow-md
            cursor-pointer
            hover:scale-[1.02] hover:shadow-lg
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          "
        >
          <Save className="w-5 h-5" />
          Guardar Cambios
        </button>
      </div>

      {/* Botones Volver y Eliminar */}
      <div className="  from-orange-100 via-orange-50/20 to-orange-100 px-6 py-4 flex flex-col items-center">
        <div className="h-0.5 w-10/12 bg-linear-to-r from-orange-100 via-orange-500 to-orange-100 rounded-full mt-15 mb-5" />
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center gap-3">
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

          <DeleteButton loading={loading} itemName={`el plan ${plan.name}`} onDelete={handleDelete} />
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={handleCloseModal} title="¡Plan Eliminado!" message={modalMessage} />
    </div>
  );
}
