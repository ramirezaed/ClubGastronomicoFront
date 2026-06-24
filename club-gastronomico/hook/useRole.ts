import { getRoleById } from "@/services/role.service";
import { role } from "@/types/role.types";
import { useState } from "react";

export const useRole = () => {
  const [role, setRole] = useState<role | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //hook para obtener los datos de un rol
  const fetchRoleById = async (id: string) => {
    setError(null);
    setLoading(true);
    try {
      const response = await getRoleById(id);
      setRole(response);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al obtener datos del rol");
    } finally {
      setLoading(false);
    }
  };

  return {
    role,
    loading,
    error,
    fetchRoleById,
  };
};
