import api from "@/lib/axios";

import {
  CancelOrderPayload,
  cancelOrderResponse,
  changeStatusResponse,
  getItemsParams,
  Order,
  PaginationResponse,
  RegisterOrder,
} from "@/types/ordertypes";

export async function getOrders(params?: getItemsParams): Promise<PaginationResponse<Order>> {
  const { data } = await api.get<PaginationResponse<Order>>(`/orders`, { params });
  return data;
}

export async function getById(id: string): Promise<Order> {
  const { data } = await api.get<Order>(`orders/${id}`);
  return data;
}

export async function cancelar(id: string, params: CancelOrderPayload): Promise<cancelOrderResponse> {
  const { data } = await api.patch<cancelOrderResponse>(`/orders/${id}/cancel`, params); //envia por el body
  return data;
}

export async function changeStatus(id: string, status: string): Promise<changeStatusResponse> {
  const { data } = await api.patch<changeStatusResponse>(`/orders/${id}/status`, undefined, { params: { status } });
  return data;
}

export async function Register(params: RegisterOrder): Promise<Order> {
  const { data } = await api.post<Order>(`/orders`, params); //envia por el body
  return data;
}
