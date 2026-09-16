import { getById } from "@/services/category.service";
import { categoryResponse } from "@/types/category.types";
import { useCallback, useState } from "react";

export const useCategoryById = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<categoryResponse | null>(null);

  const fetchById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getById(id);
      setCategory(response);
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
    category,
    fetchById,
  };
};
