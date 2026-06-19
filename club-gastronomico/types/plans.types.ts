export interface Plans {
  id: string;
  name: string;
  price: string;
  description: string;
  is_active: boolean;
}

export interface softDeletePlanResponse {
  message: string;
}
