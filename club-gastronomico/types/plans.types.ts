export interface Plans {
  id: string;
  name: string;
  price: number;
  description: string;
  is_active: boolean;
}

export interface softDeletePlanResponse {
  message: string;
}
