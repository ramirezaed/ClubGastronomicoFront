import api from "@/lib/axios";
import {
  deactivateActivateMenuItems,
  deleteItems,
  getItemsParams,
  Menu,
  MenuItem,
  PaginationResponse,
  UpdateMenuItems,
  UpdateMenuResponse,
} from "@/types/menu.types";

export async function getMenu(params?: getItemsParams): Promise<PaginationResponse<Menu>> {
  const { data } = await api.get<PaginationResponse<Menu>>(`/menu-items`, { params });
  return data;
}

export async function getById(id: string): Promise<MenuItem> {
  const { data } = await api.get<MenuItem>(`/menu-items/${id}`, { params: { id } });
  return data;
}

export async function updatemenuI(id: string, data: UpdateMenuItems): Promise<UpdateMenuResponse> {
  const { data: responseData } = await api.patch<UpdateMenuResponse>(`/menu-items/${id}`, data);
  return responseData;
}

export async function activate(id: string): Promise<deactivateActivateMenuItems> {
  const { data } = await api.patch<deactivateActivateMenuItems>(`/menu-items/activate/${id}`, { params: { id } });
  return data;
}

export async function deactivate(id: string): Promise<deactivateActivateMenuItems> {
  const { data } = await api.patch<deactivateActivateMenuItems>(`/menu-items/deactivate/${id}`, { params: { id } });
  return data;
}

export async function softDeleteItems(id: string): Promise<deleteItems> {
  const { data } = await api.delete<deleteItems>(`/menu-items/${id}`, { params: { id } });
  return data;
}
