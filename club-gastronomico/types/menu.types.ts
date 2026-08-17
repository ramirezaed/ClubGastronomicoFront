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
