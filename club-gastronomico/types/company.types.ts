export interface Company {
  id: string;
  subscription_plan: {
    id: string;
    name: string;
  };
  owner: {
    id: string;
    email: string;
  };
  name: string;
  phone: string;
  is_active: boolean;
}

export interface PaginationResponse<T> {
  message: string;
  company: {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

//parametros para la paginacion de companias
export interface getCompaniesParams {
  page?: number;
  limit?: number;
}

export interface activateDeactivateCompany {
  id: string;
  is_active: boolean;
}

export interface softDeleteCompany {
  message: string;
}
