import api from "@/lib/axios";
import { Menu, MenuItem } from "@/types/menu.types";

export async function getMenu(): Promise<Menu> {
  const { data } = await api.get<Menu>(`/menu-items`);
  return data;
}

export async function getById(id: string): Promise<MenuItem> {
  const { data } = await api.get<MenuItem>(`/menu-items/${id}`, { params: { id } });
  return data;
}
