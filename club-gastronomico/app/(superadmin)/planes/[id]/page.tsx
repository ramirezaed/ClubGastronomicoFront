"use client";

import { DeleteButton } from "@/app/components/ui/DeleteButton";
import { usePlan } from "@/hook/useplan";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PlanDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { plan, loading, error, deletePlan, fetchPlanById } = usePlan();
  const [modalOpen, setModalOpen] = useState(false); //modal que muestra mensaje cerrado

  //funcion para traer los datos del plan, se ejecuta cando se renderiza la pagina
  useEffect(() => {
    fetchPlanById(id);
  }, [id]);

  //funcion para manejar el boton eliminar
  const handleDelete = async () => {
    if (!plan) return;
    const response = await deletePlan(plan.id);
    if (response) {
      setModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:justify-center gap-3 sm:gap-6">
      <DeleteButton loading={loading} itemName={`al plan ${plan?.name}`} onDelete={handleDelete} />
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{plan?.name}</h1>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{plan?.price}</h1>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{plan?.description}</h1>
    </div>
  );
}
