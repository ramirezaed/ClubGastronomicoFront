import { getDaylySales } from "@/services/reports.service";
import { DailySalesResponse } from "@/types/reports.types";
import { useCallback, useState } from "react";

export const useReports = () => {
  const [dailySales, setDailySales] = useState<DailySalesResponse | null>(null);
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

  return { dailySales, loading, error, fetchDailySales };
};
