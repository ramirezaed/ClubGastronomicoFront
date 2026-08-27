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
  const { data } = await api.get<PaginationResponse<User>>("/user", { params });
  return data;
}

export async function getById(id: string): Promise<User> {
  const { data } = await api.get<{ user: User }>(`/user/${id}`);
  return data.user;
}

export async function activate(id: string): Promise<activateDeactivateResponse> {
  const { data } = await api.patch<activateDeactivateResponse>(`/user/activate/${id}`);
  return data;
}

export async function deactivate(id: string): Promise<activateDeactivateResponse> {
  const { data } = await api.patch<activateDeactivateResponse>(`/user/deactivate/${id}`);
  return data;
}

export async function softDelete(id: string): Promise<softDeleteUser> {
  const { data } = await api.delete<softDeleteUser>(`/user/${id}`);
  return data;
}

export async function updateRol(id: string, role_id: string): Promise<changeRol> {
  const { data } = await api.patch<changeRol>(`/user/role/${id}`, { role_id });
  return data;
}

export async function searchUser(name?: string, email?: string): Promise<User[]> {
  const { data } = await api.post<User[]>(`/user/search`, { name, email });
  return data;
}
