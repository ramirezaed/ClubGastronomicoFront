import { getPlans } from "@/services/plan.service";
import { Plans } from "@/types/plans.types";
import { useCallback, useState } from "react";

export const usePlans = () => {
  const [plans, setPlans] = useState<Plans[]>([]); //si no  hay planes muestra vacio
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //useCallback memoriza los roles, evita que la funcion se cree en cada renderizacion
  const fetchPlans = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPlans();
      setPlans(response);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "ocurrio un error al buscar los planes");
    } finally {
      setLoading(false);
    }
  }, []);

  return { plans, loading, error, fetchPlans };
};
