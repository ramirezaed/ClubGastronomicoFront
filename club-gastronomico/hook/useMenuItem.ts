import { getById } from "@/services/menu.service";
import { MenuItem } from "@/types/menu.types";
import { useCallback, useState } from "react";

export const useMenuItems = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem | null>(null);

  const fetchById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getById(id);
      setMenuItems(response);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : " error al obtener datos");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    error,
    loading,
    menuItems,
    fetchById,
  };
};
