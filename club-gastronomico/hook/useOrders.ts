import { getOrders } from "@/services/order.service";
import { getItemsParams, Order } from "@/types/ordertypes";
import { useCallback, useState } from "react";

export const useOrders = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const [pageLoading, setPageLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const fetchOrders = useCallback(async (params?: getItemsParams, pageChange = false) => {
    if (pageChange) {
      setPageLoading(true);
    } else {
      setLoading(true);
    }
    setError(null);
    try {
      const response = await getOrders(params);

      setOrders(response.data);

      if (response) {
        setPagination({
          page: response.page || 1,
          limit: response.limit || 10,
          total: response.total || 0,
          totalPages: response.totalPages || 1,
        });
      }

      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error al obtener el menú");
    } finally {
      setLoading(false);
      setPageLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    pagination,
    orders,
    pageLoading,
    fetchOrders,
  };
};
