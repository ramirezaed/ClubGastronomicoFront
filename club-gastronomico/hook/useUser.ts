import { activate, deactivate, getById } from "@/services/user.service";
import { useState } from "react";

export const useUser = () => {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getById(id);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : " error al obtener datos del usuario");
    } finally {
      setLoading(false);
    }
  };
  const activateUser = async (id: string) => {
    setUpdating(true);
    setError(null);
    try {
      const response = await activate(id);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al activar usuario");
    } finally {
      setUpdating(false);
    }
  };
  const deactivateUser = async (id: string) => {
    setUpdating(true);
    setError(null);
    try {
      const response = await deactivate(id);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al desactivar usuario");
    } finally {
      setUpdating(false);
    }
  };
  const tooglestatus = async (id: string, isActive: boolean) => {
    if (isActive) {
      return deactivateUser(id);
    }
    return activateUser(id);
  };

  return { loading, error, fetchById, activateUser, deactivateUser, tooglestatus, updating };
};
