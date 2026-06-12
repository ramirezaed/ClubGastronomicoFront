import { getById } from "@/services/user.service";
import { useState } from "react";

export const useUser = () => {
  const [loading, setLoading] = useState(true);
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
  return { loading, error, fetchById };
};
