import { deleteRole, getRoleById, register } from "@/services/role.service";
import { registerRole, role } from "@/types/role.types";
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
  const softDeleteRole = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteRole(id);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al intentar eliminar el rol");
    } finally {
      setLoading(false);
    }
  };
  const registerRole = async (data: registerRole) => {
    setLoading(true);
    setError(null);
    try {
      const response = await register(data);
      setRole(response);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al intentar registrar un nuevo rol");
    } finally {
      setLoading(false);
    }
  };
  return {
    role,
    loading,
    error,
    fetchRoleById,
    softDeleteRole,
    registerRole,
  };
};
