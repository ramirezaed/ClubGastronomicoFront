import { getMenu } from "@/services/menu.service";
import { Menu } from "@/types/menu.types";
import { useCallback, useState } from "react";

export const useMenu = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [menu, setMenu] = useState<Menu | null>(null);

  //hook
  const fetchMenu = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getMenu();
      setMenu(response);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error al obtener el plan");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    error,
    loading,
    menu,
    fetchMenu,
  };
};
