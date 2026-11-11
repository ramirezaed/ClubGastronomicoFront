import { cancelar, changeStatus, getById, Register } from "@/services/order.service";
import { CancelOrderPayload, Order, RegisterOrder } from "@/types/ordertypes";
import { useCallback, useState } from "react";

export const useOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [newOrder, setNewOrder] = useState<Order | null>(null);

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

  const cancelarOrden = async (id: string, params: CancelOrderPayload) => {
    setError(null);
    try {
      const response = await cancelar(id, params);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al cancelar la orden");
    }
  };

  const changeStatusOrder = async (id: string, status: string) => {
    setError(null);
    try {
      const response = await changeStatus(id, status);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al cambiar de estado");
    }
  };

  const RegisterNewOrder = async (params: RegisterOrder) => {
    setError(null);
    try {
      const response = await Register(params);
      setNewOrder(response);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al registrar nuevo pedido");
    }
  };

  return {
    loading,
    order,
    error,
    newOrder,
    fetchById,
    cancelarOrden,
    changeStatusOrder,
    RegisterNewOrder,
  };
};
