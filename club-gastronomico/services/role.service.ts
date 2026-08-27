import { GetRolesResponse, registerRole, role, softDeleteRole } from "@/types/role.types";
import api from "@/lib/axios";

export async function getRoles(): Promise<GetRolesResponse> {
  const { data } = await api.get<GetRolesResponse>(`/roles`);
  return data;
}

export async function getRoleById(id: string): Promise<role> {
  const { data } = await api.get<role>(`/roles/${id}`);
  return data;
}

export async function deleteRole(id: string): Promise<softDeleteRole> {
  const { data } = await api.delete<softDeleteRole>(`/roles/${id}`);
  return data;
}

export async function register(data: registerRole): Promise<role> {
  const { data: responseData } = await api.post<role>(`/roles`, data);
  return responseData;
}

export async function update(id: string, description?: string): Promise<role> {
  const { data } = await api.patch<role>(`/roles/${id}`, { description });
  return data;
}
