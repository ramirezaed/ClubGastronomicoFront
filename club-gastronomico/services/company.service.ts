import {
  activateDeactivateCompany,
  Company,
  getCompaniesParams,
  PaginationResponse,
  softDeleteCompany,
} from "@/types/company.types";
import api from "@/lib/axios";

export async function getAllCompany(params?: getCompaniesParams): Promise<PaginationResponse<Company>> {
  const { data } = await api.get<PaginationResponse<Company>>(`/company`, { params });
  return data;
}

export async function getCompanyById(id: string): Promise<Company> {
  const { data } = await api.get<{ company: Company }>(`/company/${id}`);
  return data.company;
}

export async function changePlan(id: string, plan_id: string): Promise<Company> {
  const { data } = await api.patch<Company>(`/company/change-plan/${id}`, { plan_id });
  return data;
}

export async function activate(id: string): Promise<activateDeactivateCompany> {
  const { data } = await api.patch<activateDeactivateCompany>(`/company/activate/${id}`);
  return data;
}

export async function deacticate(id: string): Promise<activateDeactivateCompany> {
  const { data } = await api.patch<activateDeactivateCompany>(`/company/deactivate/${id}`);
  return data;
}

export async function softDelete(id: string): Promise<softDeleteCompany> {
  const { data } = await api.delete<softDeleteCompany>(`/company/${id}`);
  return data;
}

export async function searchCompany(name?: string): Promise<Company[]> {
  const { data } = await api.post<Company[]>(`/company/search`, { name });
  return data;
}
