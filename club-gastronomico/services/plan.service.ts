import api from "@/lib/axios";
import { Plans, RegisterPlan, softDeletePlanResponse } from "@/types/plans.types";

export async function getPlans(): Promise<Plans[]> {
  const { data } = await api.get<Plans[]>(`/plans`);
  return data;
}

export async function getplanById(id: string): Promise<Plans> {
  const { data } = await api.get<Plans>(`/plans/${id}`);
  return data;
}

export async function softDeletePlan(id: string): Promise<softDeletePlanResponse> {
  const { data } = await api.delete<softDeletePlanResponse>(`/plans/${id}`);
  return data;
}

export async function updatePlan(id: string, price?: string, description?: string): Promise<Plans> {
  const { data } = await api.patch<Plans>(`/plans/${id}`, { price, description });
  return data;
}

export async function newPlan(data: RegisterPlan): Promise<Plans> {
  const { data: responseData } = await api.post<Plans>(`/plans`, data);
  return responseData;
}
