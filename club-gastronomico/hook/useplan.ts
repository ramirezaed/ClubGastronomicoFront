import { getplanById, newPlan, softDeletePlan, updatePlan } from "@/services/plan.service";
import { Plans, RegisterPlan } from "@/types/plans.types";
import { useState } from "react";

export const usePlan = () => {
  const [plan, setPlan] = useState<Plans | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //hook para buscar un plan por id
  const fetchPlanById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getplanById(id);
      setPlan(response);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error al obtener el plan");
    } finally {
      setLoading(false);
    }
  };

  //hook para eliinar un plan
  const deletePlan = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await softDeletePlan(id);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error al intentar eliminar el plan");
    } finally {
      setLoading(false);
    }
  };

  //hook para modificar los datos de un plan
  const update = async (id: string, price?: string, description?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updatePlan(id, price, description);
      setPlan(response);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al intentar actualizar el plan");
    } finally {
      setLoading(false);
    }
  };

  //hook para registrar un nuevo plan
  const register = async (data: RegisterPlan) => {
    setError(null);
    setLoading(true);
    try {
      const response = await newPlan(data);
      setPlan(response);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al intentar registrar un nuevo plan");
    } finally {
      setLoading(false);
    }
  };

  return {
    plan,
    loading,
    error,
    fetchPlanById,
    deletePlan,
    update,
    register,
  };
};
