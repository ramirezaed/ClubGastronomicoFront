import api from "@/lib/axios";

import { CancelOrderPayload, cancelOrderResponse, getItemsParams, Order, PaginationResponse } from "@/types/ordertypes";

export async function getOrders(params?: getItemsParams): Promise<PaginationResponse<Order>> {
  const { data } = await api.get<PaginationResponse<Order>>(`/orders`, { params });
  return data;
}

export async function getById(id: string): Promise<Order> {
  const { data } = await api.get<Order>(`orders/${id}`);
  return data;
}

export async function cancelar(id: string, params: CancelOrderPayload): Promise<cancelOrderResponse> {
  const { data } = await api.patch<cancelOrderResponse>(`/orders/${id}/cancel`, params);
  return data;
}
