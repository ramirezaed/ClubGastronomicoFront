import api from "@/lib/axios";
import { categoryResponse, createCategory } from "@/types/category.types";

export async function registerCategory(data: createCategory): Promise<categoryResponse> {
  const { data: response } = await api.post<categoryResponse>(`/categories/`, data);
  return response;
}

export async function getAll(): Promise<categoryResponse> {
  const { data } = await api.get<categoryResponse>(`/categories`);
  return data;
}
