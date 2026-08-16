import {
  getCanceledSales,
  getDaylySales,
  getTopHours,
  getTopItems,
  GetCancellationsAnalysis,
} from "@/services/reports.service";
import {
  canceledSalesResponse,
  cancellationsAnalysisResponse,
  DailySalesResponse,
  TopHoursResponse,
  topItemsResponse,
} from "@/types/reports.types";
import { useCallback, useState } from "react";

export const useReports = () => {
  const [dailySales, setDailySales] = useState<DailySalesResponse | null>(null);
  const [canceledSales, setCanceledSales] = useState<canceledSalesResponse | null>(null);
  const [topItems, setTopItems] = useState<topItemsResponse | null>(null);
  const [topHours, setTopHours] = useState<TopHoursResponse | null>(null);

  const [analysisCancelled, setAnalysisCancelled] = useState<cancellationsAnalysisResponse | null>(null);

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

  const fetchTopHours = useCallback(async (date_from?: string, date_to?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTopHours(date_from, date_to);
      setTopHours(response);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "ocurrio un error inesperado");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCancellationsAnalysis = useCallback(async (date_from?: string, date_to?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await GetCancellationsAnalysis(date_from, date_to);
      setAnalysisCancelled(response);
    } catch (error) {
      setError(error instanceof Error ? error.message : "ocurrio un error inesperado");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    dailySales,
    canceledSales,
    topItems,
    topHours,
    loading,
    error,
    analysisCancelled,
    fetchDailySales,
    fetchCanceledSales,
    fetchTopItems,
    fetchTopHours,
    fetchCancellationsAnalysis,
  };
};
