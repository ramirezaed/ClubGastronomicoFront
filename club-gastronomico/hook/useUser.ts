import { activate, deactivate, getById, softDelete, updateRol } from "@/services/user.service";
import { useState } from "react";
/**
 * Hook personalizado para gestionar las acciones individuales de un usuario.
 * Proporciona estados de carga, actualización y manejo de errores.
 */
export const useUser = () => {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //obtener usuario por id
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
  // Activa una cuenta de usuario.
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
  //desactiva cuenta de usuario
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
  // alterna el estado de activado a desactivado, segun su estado actual
  const toogglestatus = async (id: string, isActive: boolean) => {
    if (isActive) {
      return deactivateUser(id);
    }
    return activateUser(id);
  };
  //baja logica de un usuario
  const deleteUser = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await softDelete(id);
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al eliminar usuario");
    } finally {
      setLoading(false);
    }
  };
  const updateRolUser = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateRol(id);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al cambiar el rol");
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    error,
    fetchById,
    activateUser,
    deactivateUser,
    toogglestatus,
    updating,
    deleteUser,
    updateRolUser,
  };
};
