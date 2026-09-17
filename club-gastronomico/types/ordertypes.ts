export interface Order {
  id: string;
  status: string;
  order_number: number;
  customer: OrderCustomer;
  items: OrderItem[];
  total_amount: number;
  created_at: Date;
}

export interface OrderCustomer {
  name: string;
  address: string;
  phone: string;
  telegram_username: string;
}
export interface OrderItem {
  items_name: string;
  category_name: string;
  quantity: number;
  unit_price: number;
}

export interface PaginationResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface getItemsParams {
  status?: string;
  page?: number;
  limit?: number;
}

export const ORDER_STATUS = {
  PENDING: "Pendiente",
  IN_PROGRESS: "En Progreso",
  COMPLETED: "Completo",
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export const ORDER_COLUMNS: OrderStatus[] = [ORDER_STATUS.PENDING, ORDER_STATUS.IN_PROGRESS, ORDER_STATUS.COMPLETED];

export interface cancelOrderResponse {
  message: string;
}

export const CANCEL_REASONS = {
  LONG_WAIT_TIME: "El tiempo de espera es demasiado largo",
  WRONG_ADDRESS: "Me equivoqué en la dirección de entrega",
  MISTAKE_IN_ITEMS: "Pedí los productos equivocados",
  FORGOT_DISCOUNT: "Olvidé aplicar un cupón o descuento",
  DUPLICATED_ORDER: "Hice el pedido dos veces sin querer",
  BUDGET_EXCEEDED: "El costo final superó mi presupuesto",
  NO_LONGER_WANTED: "Ya no quiero el pedido / Cambié de opinión",
  OTHER: "Otro motivo",
} as const;

export type CancelReason = keyof typeof CANCEL_REASONS;

export interface CancelOrderPayload {
  reason: string;
  custom_reason?: string;
}
