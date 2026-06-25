import { company, PaginationResponse } from "@/types/company.types";
import api from "@/lib/axios";

export async function getAllCompany(): Promise<PaginationResponse<company>> {
  try {
    const response = await api.get(`/company`);
    return response.data;
  } catch (error) {
    //devuelve el error que envia la api
    //el interceptor axios maneja los errores
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("ocurrio un error inesperado");
  }
}
