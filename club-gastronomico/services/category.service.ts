import api from "@/lib/axios";
import { categoriesResponse, categoryResponse, categoryStatus, createCategory } from "@/types/category.types";

export async function registerCategory(data: createCategory): Promise<categoryResponse> {
  const { data: response } = await api.post<categoryResponse>(`/categories/`, data);
  return response;
}

export async function getAll(): Promise<categoriesResponse> {
  const { data } = await api.get<categoriesResponse>(`/categories`);
  return data;
}

export async function getById(id: string): Promise<categoryResponse> {
  const { data } = await api.get<categoryResponse>(`/categories/${id}`, { params: { id } });
  return data;
}

export async function activate(id: string): Promise<categoryStatus> {
  const { data } = await api.patch<categoryStatus>(`/categories/activate/${id}`, { params: { id } });
  return data;
}

export async function deactivate(id: string): Promise<categoryStatus> {
  const { data } = await api.patch<categoryStatus>(`/categories/deactivate/${id}`, { params: { id } });
  return data;
}
