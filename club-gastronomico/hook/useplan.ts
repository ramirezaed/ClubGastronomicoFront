import { softDeletePlan } from "@/services/plan.service";
import { useState } from "react";

export const usePlan = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const deletePlan = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await softDeletePlan(id);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al intentar eliminar el plan");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deletePlan };
};
