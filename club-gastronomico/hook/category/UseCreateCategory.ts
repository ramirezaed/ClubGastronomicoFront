import { registerCategory } from "@/services/category.service";
import { categoryResponse, createCategory } from "@/types/category.types";
import { useState } from "react";

export const useCreateCategory = () => {
  const [createC, setCreatedC] = useState<categoryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCa = async (data: createCategory) => {
    setError(null);
    setLoading(true);
    try {
      const response = await registerCategory(data);
      setCreatedC(response);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al crear una nueva categoria");
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    createC,
    createCa,
  };
};
