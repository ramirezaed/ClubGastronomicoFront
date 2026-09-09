export interface MenuItem {
  id: string;
  category: Category;
  name: string;
  description: string;
  price: number;
  preparation_time_minutes: number;
  stock: number;
  image_url?: string | null;
  is_active: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface Menu {
  data: MenuItem[];
}

export interface items {
  data: MenuItem[];
}
export interface UpdateMenuItems {
  name: string;
  description: string;
  price: number;
  preparation_time_minutes?: number;
  stock: number;
  is_active: boolean;
}

export interface UpdateMenuResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  preparation_time_minutes?: number;
  stock: number;
  is_active: boolean;
}

export interface deactivateActivateMenuItems {
  id: string;
  is_active: false;
}

export interface deleteItems {
  message: string;
}

export interface PaginationResponse<T> {
  message: string;
  items: {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface getItemsParams {
  is_active?: boolean;
  page?: number;
  limit?: number;
}

export interface createMenu {
  category_id: string;
  name: string;
  description: string;
  price: number;
  preparation_time_minutes: number;
  stock: number;
  image_url?: string | null;
}
