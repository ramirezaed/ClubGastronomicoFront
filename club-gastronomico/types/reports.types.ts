export interface DailySalesResponse {
  date: string;
  total_orders: number;
  total_amount: number;
}

export interface canceledSalesResponse {
  date: string;
  total_orders: number;
}

export interface topItem {
  item_name: string;
  category_name: string;
  total_quantity: number;
  total_amount: number;
}
export interface topItemsResponse {
  date_from: string;
  date_to: string;
  topItems: topItem[];
}
