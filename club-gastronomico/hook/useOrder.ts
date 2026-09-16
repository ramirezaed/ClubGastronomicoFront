import { getById } from "@/services/order.service";
import { Order } from "@/types/ordertypes";
import { useCallback, useState } from "react";

export const useOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);

  const fetchById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getById(id);
      setOrder(response);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al obtener datos del la orden");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    order,
    error,
    fetchById,
  };
};
