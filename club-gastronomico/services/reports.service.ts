import api from "@/lib/axios";
import { canceledSalesResponse, DailySalesResponse, topItemsResponse } from "@/types/reports.types";

//servicio para reporte de ventas diarias
export async function getDaylySales(date?: string): Promise<DailySalesResponse> {
  try {
    const response = await api.get(`/reports/dailySales`, { params: { date } }); //cuando es req.query
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("ocurrio un error inesperado");
  }
}

export async function getCanceledSales(date?: string): Promise<canceledSalesResponse> {
  try {
    const response = await api.get(`/reports/canceled-sales`, { params: { date } });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("ocurrio un error inesperado");
  }
}

export async function getTopItems(date_from?: string, date_to?: string): Promise<topItemsResponse> {
  try {
    const response = await api.get(`/reports/top-items`, { params: { date_from, date_to } });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("ocurrio un error inesperado");
  }
}
