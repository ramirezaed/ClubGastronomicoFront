import api from "@/lib/axios";
import { DailySalesResponse } from "@/types/reports.types";

//servicio para reporte de ventas diarias
export async function getDaylySales(date?: string): Promise<DailySalesResponse> {
  try {
    const response = await api.get(`/reports`, { params: date }); //cuando es req.query
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("ocurrio un error inesperado");
  }
}
