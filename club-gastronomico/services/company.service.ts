import { Company, getCompaniesParams, PaginationResponse } from "@/types/company.types";
import api from "@/lib/axios";
import { AArrowDown } from "lucide-react";

export async function getAllCompany(params?: getCompaniesParams): Promise<PaginationResponse<Company>> {
  try {
    const response = await api.get(`/company`, { params });
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

export async function getCompanyById(id: string) {
  try {
    const response = await api.get(`/company/${id}`);
    return response.data.company;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("ocurrio un error inesperado");
  }
}

export async function changePlan(id: string, namePlan: string) {
  try {
    const response = await api.patch(`/company/${id}`, { namePlan });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("ocrurrio un error inesperado");
  }
}
