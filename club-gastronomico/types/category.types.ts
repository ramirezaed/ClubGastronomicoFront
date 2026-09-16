export interface createCategory {
  name: string;
}

export interface categoryResponse {
  id: string;
  name: string;
  is_active: boolean;
}

export interface categoriesResponse {
  data: categoriesResponse[];
}

export interface categoryStatus {
  id: string;
  is_active: boolean;
}
