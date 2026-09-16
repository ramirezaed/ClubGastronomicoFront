import { activate, deactivate } from "@/services/category.service";
import { useCallback, useState } from "react";

export const useCategoryActivateDeactivate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activateCategory = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await activate(id);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al obtener datos");
    } finally {
      setLoading(false);
    }
  }, []);

  const deactivateCategory = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deactivate(id);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al obtener datos");
    } finally {
      setLoading(false);
    }
  }, []);

  const toogglestatus = async (id: string, isActive: boolean) => {
    if (isActive) {
      return deactivate(id);
    }
    return activate(id);
  };

  return {
    loading,
    error,
    activateCategory,
    deactivateCategory,
    toogglestatus,
  };
};
