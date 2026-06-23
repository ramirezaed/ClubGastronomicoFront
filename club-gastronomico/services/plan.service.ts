import api from "@/lib/axios";
import { Plans, RegisterPlan, softDeletePlanResponse } from "@/types/plans.types";
import axios from "axios";

export async function getPlans(): Promise<Plans[]> {
  try {
    const response = await api.get("/plans");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? "error al buscar los planes");
    }
    throw new Error("ocurrio un error inesperado");
  }
}

export async function getplanById(id: string): Promise<Plans> {
  try {
    const response = await api.get(`/plans/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? "error al obtener informacion del plan");
    }
    throw new Error("ocurrio un error inesperado");
  }
}

export async function softDeletePlan(id: string): Promise<softDeletePlanResponse> {
  try {
    const response = await api.delete(`/plans/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? "error al intentar eliminar el plan");
    }
    throw new Error("ocurrio un error inesperado");
  }
}

export async function updatePlan(id: string, price?: string, description?: string): Promise<Plans> {
  try {
    const response = await api.patch(`/plans/${id}`, { price, description }); //price y description req.body
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? "error al intentar actualizar el plan");
    }
    throw new Error("ocurrio un error inesperado");
  }
}

export async function newPlan(data: RegisterPlan): Promise<Plans> {
  try {
    const response = await api.post(`/plans`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message ?? "error al agregar un nuevo plan");
    }
    throw new Error("ocurrio un error inesperado");
  }
}
