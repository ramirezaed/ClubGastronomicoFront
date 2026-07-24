import { getCanceledSales, getDaylySales, getTopItems } from "@/services/reports.service";
import { canceledSalesResponse, DailySalesResponse, topItemsResponse } from "@/types/reports.types";
import { useCallback, useState } from "react";

export const useReports = () => {
  const [dailySales, setDailySales] = useState<DailySalesResponse | null>(null);
  const [canceledSales, setCanceledSales] = useState<canceledSalesResponse | null>(null);
  const [topItems, setTopItems] = useState<topItemsResponse | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDailySales = useCallback(async (date?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDaylySales(date);
      setDailySales(response);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al obtener reporte de ventas");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCanceledSales = useCallback(async (date?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCanceledSales(date);
      setCanceledSales(response);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al obtener reporte de ordenes canceladas");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTopItems = useCallback(async (date_from?: string, date_to?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTopItems(date_from, date_to);
      setTopItems(response);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "error al obtener reporte top 5 items mas vendidos");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    dailySales,
    canceledSales,
    topItems,
    loading,
    error,
    fetchDailySales,
    fetchCanceledSales,
    fetchTopItems,
  };
};
