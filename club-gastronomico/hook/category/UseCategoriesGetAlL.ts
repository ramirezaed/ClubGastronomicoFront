import { getAll } from "@/services/category.service";
import { useCallback, useState } from "react";

export const useCategoryGetAll = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAll();
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al obtener datos");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getAllCategories,
  };
};
