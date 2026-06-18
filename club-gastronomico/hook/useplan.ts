import { getplanById, softDeletePlan } from "@/services/plan.service";
import { Plans } from "@/types/plans.types";
import { useState } from "react";

export const usePlan = () => {
  const [plan, setPlan] = useState<Plans | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return {
    plan,
    loading,
    error,
    fetchPlanById,
    deletePlan,
  };
};
