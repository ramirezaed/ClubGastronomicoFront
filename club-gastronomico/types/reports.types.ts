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

//interface para reporte top de horas con mas ventas por dia
export interface topDayHour {
  label: string;
  total_orders: number;
}

export interface TopHoursResponse {
  top_hours: topDayHour[];
}

export interface reasonCancellations {
  reason: string;
  total: number;
  percentage_of_cancellations: number;
}

export interface cancellationsAnalysisResponse {
  date_from: string;
  date_to: string;
  total_orders: number;
  total_cancellations: number;
  cancellation_percentage: number;
  reasons: reasonCancellations[];
}

export interface evolutionMonths {
  month: string;
  total_orders: number;
  total_amount: number;
}
export interface salesEvolutions {
  months: evolutionMonths[];
}

export interface sellers {
  menuItems_id: string;
  item_name: string;
  category_name: string;
  total_quantity: number;
}

export interface getTopAndLeastResponse {
  top_sellers: sellers[];
  least_sellers: sellers[];
}
