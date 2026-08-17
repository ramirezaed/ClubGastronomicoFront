import api from "@/lib/axios";
import { Plans, RegisterPlan, softDeletePlanResponse } from "@/types/plans.types";

export async function getPlans(): Promise<Plans[]> {
  const { data } = await api.get<Plans[]>(`/plans`);
  return data;
}

export async function getplanById(id: string): Promise<Plans> {
  try {
    const response = await api.get(`/plans/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("ocurrio un error inesperado");
  }
}

export async function softDeletePlan(id: string): Promise<softDeletePlanResponse> {
  try {
    const response = await api.delete(`/plans/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("ocurrio un error inesperado");
  }
}

export async function updatePlan(id: string, price?: string, description?: string): Promise<Plans> {
  try {
    const response = await api.patch(`/plans/${id}`, { price, description }); //price y description req.body
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("ocurrio un error inesperado");
  }
}

export async function newPlan(data: RegisterPlan): Promise<Plans> {
  try {
    const response = await api.post(`/plans`, data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("ocurrio un error inesperado");
  }
}
