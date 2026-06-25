import { GetRolesResponse, registerRole, role, softDeleteRole } from "@/types/role.types";
import api from "@/lib/axios";
import axios, { Axios } from "axios";
import { updatePlan } from "@/services/plan.service";

export async function getRoles(): Promise<GetRolesResponse> {
  try {
    const response = await api.get(`/roles`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? "Error al obtener los roles");
    }
    throw new Error("Ocurrió un error inesperado");
  }
}
export async function getRoleById(id: string): Promise<role> {
  try {
    const response = await api.get(`/roles/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? "Error al obtener el rol");
    }
    throw new Error("ocurrio un error inesperado");
  }
}
export async function deleteRole(id: string): Promise<softDeleteRole> {
  try {
    const response = await api.delete(`/roles/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message ?? "Error al eliminar el rol");
    }
    throw new Error("ocurrio un error inesperado");
  }
}
export async function register(data: registerRole): Promise<role> {
  try {
    const response = await api.post(`/roles`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message ?? "Error al intentar registrar un nuevo rol");
    }
    throw new Error("Ocurrio un error inesperado");
  }
}

export async function update(id: string, description?: string) {
  try {
    const response = await api.patch(`/roles/${id}`, { description });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message ?? "Error al intentar actualizar rol");
    }
    throw new Error("Ocurrio un error inesperado");
  }
}
