import api from "@/lib/axios";
import {
  canceledSalesResponse,
  cancellationsAnalysisResponse,
  DailySalesResponse,
  TopHoursResponse,
  topItemsResponse,
} from "@/types/reports.types";

//servicio para reporte de ventas diarias
export async function getDaylySales(date?: string): Promise<DailySalesResponse> {
  const { data } = await api.get<DailySalesResponse>(`/reports/dailySales`, { params: { date } });
  return data;
}

//servicio para ver la cantidad de cancelaciones
export async function getCanceledSales(date?: string): Promise<canceledSalesResponse> {
  const { data } = await api.get<canceledSalesResponse>(`/reports/canceled-sales`, { params: { date } });
  return data;
}
//serviccio para ver los productos mas vendidos
export async function getTopItems(date_from?: string, date_to?: string): Promise<topItemsResponse> {
  const { data } = await api.get<topItemsResponse>(`/reports/top-items`, { params: { date_from, date_to } });
  return data;
}

//servicio para ver horarios con mas ventas
export async function getTopHours(date_from?: string, date_to?: string): Promise<TopHoursResponse> {
  const { data } = await api.get<TopHoursResponse>(`/reports/top-hours-days`, { params: { date_from, date_to } });
  return data;
}

//servicio para ver analisis de cnacelaciones
export async function GetCancellationsAnalysis(
  date_from?: string,
  date_to?: string,
): Promise<cancellationsAnalysisResponse> {
  const { data } = await api.get<cancellationsAnalysisResponse>(`/reports/cancellatios`, {
    params: { date_from, date_to },
  });
  return data;
}
