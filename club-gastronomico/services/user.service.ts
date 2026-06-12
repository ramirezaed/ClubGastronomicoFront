import { getUserParams, PaginationResponse, User } from "@/types/user.types";
import api from "@/lib/axios";
export async function getUser() {}

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
    console.error(error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("error al buscar usuario");
  }
}
