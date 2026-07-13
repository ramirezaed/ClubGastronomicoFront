import {
  activateDeactivateCompany,
  Company,
  getCompaniesParams,
  PaginationResponse,
  softDeleteCompany,
} from "@/types/company.types";
import api from "@/lib/axios";
import { promises } from "dns";

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

export async function changePlan(id: string, plan_id: string) {
  try {
    const response = await api.patch(`/company/change-plan/${id}`, { plan_id });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("ocrurrio un error inesperado");
  }
}

export async function activate(id: string): Promise<activateDeactivateCompany> {
  try {
    const response = await api.patch(`/company/activate/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("ocurrio un error inesperado");
  }
}

export async function deacticate(id: string) {
  try {
    const response = await api.patch(`/company/deactivate/${id}`);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("ocurrio un error inesperado");
  }
}

export async function softDelete(id: string): Promise<softDeleteCompany> {
  try {
    const response = await api.delete(`/company/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("ocurrio un error inesperado");
  }
}

export async function searchCompany(name?: string): Promise<Company[]> {
  try {
    const response = await api.post(`/company/search`, { name });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("ocurrio un error inesperado");
  }
}
