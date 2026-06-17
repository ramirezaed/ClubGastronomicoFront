import {
  activateDeactivateResponse,
  changeRol,
  getUserParams,
  PaginationResponse,
  softDeleteUser,
  User,
} from "@/types/user.types";
import api from "@/lib/axios";

export async function getAllUser(params?: getUserParams): Promise<PaginationResponse<User>> {
  try {
    const response = await api.get("/user", { params });
    return response.data;
  } catch (error) {
    // muestra los mss que vienen de la api
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("error al buscar usuarios");
  }
}

export async function getById(id: string): Promise<User> {
  try {
    const response = await api.get(`/user/${id}`);
    return response.data.user;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("error al buscar usuario");
  }
}

export async function activate(id: string): Promise<activateDeactivateResponse> {
  try {
    const response = await api.patch(`user/activate/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("error al activar usuario");
  }
}
export async function deactivate(id: string): Promise<activateDeactivateResponse> {
  try {
    const response = await api.patch(`user/deactivate/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("error al desactivar usuario");
  }
}

export async function softDelete(id: string): Promise<softDeleteUser> {
  try {
    const response = await api.delete(`/user/${id}`);

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("error al eliminar usuario");
  }
}

export async function updateRol(id: string, role_id: string): Promise<changeRol> {
  try {
    const response = await api.patch(`/user/role/${id}`, { role_id }); //{role_id} es el body
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("error al intentar cambiar el rol");
  }
}
