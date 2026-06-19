import { getRoles } from "@/services/role.service";
import { role } from "@/types/role.types";
import { useCallback, useState } from "react";
export const useRoles = () => {
  const [roles, setRoles] = useState<role[]>([]); //si no hay roles muestra vacio
  const [loading, setLoading] = useState(true); // por defecto esta cargando
  const [error, setError] = useState<string | null>(null);

  //useCallback memoriza todos los roles, evita que se cree en cada renderizacion
  const fetchRoles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getRoles();
      setRoles(response.roles); //guarda los roles obtenidos
      return response.roles;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al buscar roles");
    } finally {
      setLoading(false);
    }
  }, []);

  return { roles, loading, error, fetchRoles };
};
