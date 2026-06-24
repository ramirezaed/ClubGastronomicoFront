import { GetRolesResponse, role, softDeleteRole } from "@/types/role.types";
import api from "@/lib/axios";
import axios from "axios";

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
