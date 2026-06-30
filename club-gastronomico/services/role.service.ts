import { GetRolesResponse, registerRole, role, softDeleteRole } from "@/types/role.types";
import api from "@/lib/axios";
import axios, { Axios } from "axios";
import { updatePlan } from "@/services/plan.service";

export async function getRoles(): Promise<GetRolesResponse> {
  try {
    const response = await api.get(`/roles`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("ocurrio un error inesperado");
  }
}
export async function getRoleById(id: string): Promise<role> {
  try {
    const response = await api.get(`/roles/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("ocurrio un error inesperado");
  }
}

export async function deleteRole(id: string): Promise<softDeleteRole> {
  try {
    const response = await api.delete(`/roles/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("ocurrio un error inesperado");
  }
}

export async function register(data: registerRole): Promise<role> {
  try {
    const response = await api.post(`/roles`, data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("ocurrio un error inesperado");
  }
}

export async function update(id: string, description?: string) {
  try {
    const response = await api.patch(`/roles/${id}`, { description });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("ocurrio un error inesperado");
  }
}
