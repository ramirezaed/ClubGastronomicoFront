import { activate, deactivate, getById, softDeleteItems, updatemenuI } from "@/services/menu.service";
import { MenuItem, UpdateMenuItems, UpdateMenuResponse } from "@/types/menu.types";
import { useCallback, useState } from "react";

export const useMenuItems = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem | null>(null);
  const [menuItemsUpdate, setMenuItemsUpdate] = useState<UpdateMenuResponse | null>(null);

  const fetchById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getById(id);
      setMenuItems(response);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error al obtener datos");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const itemsUpdate = useCallback(async (id: string, data: UpdateMenuItems): Promise<UpdateMenuResponse> => {
    setError(null);
    setLoading(true);
    try {
      const response = await updatemenuI(id, data);
      setMenuItemsUpdate(response);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error al modificar producto");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const activateItems = async (id: string) => {
    setError(null);
    try {
      const response = await activate(id);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al activar items");
    }
  };
  const deactivateItems = async (id: string) => {
    setError(null);
    try {
      const response = await deactivate(id);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al deactivar items");
    }
  };
  const toogglestatus = async (id: string, isActive: boolean) => {
    if (isActive) {
      return deactivateItems(id);
    }
    return activateItems(id);
  };

  const deleteItems = async (id: string) => {
    setError(null);
    try {
      const response = await softDeleteItems(id);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al intentar eliminar items");
    }
  };

  return {
    error,
    loading,
    menuItems,
    menuItemsUpdate,
    fetchById,
    itemsUpdate,
    activateItems,
    deactivateItems,
    deleteItems,
    toogglestatus,
  };
};
