import { GetRolesResponse, role } from "@/types/role.types";
import api from "@/lib/axios";

export async function getRoles(): Promise<GetRolesResponse> {
  try {
    const response = await api.get(`/roles`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Ocurrio un error al buscar los roles");
  }
}
