export interface UserRole {
  id: string;
  name: string;
}

export interface UserCompany {
  id: string;
  name: string;
}

export interface UserBranch {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  is_active: boolean;
  role: UserRole;
  company: UserCompany | null;
  branch: UserBranch | null;
}

export interface getUserParams {
  is_active?: boolean;
  role?: string;
  page?: number;
  limit?: number;
}

export interface PaginationResponse<T> {
  message: string;
  users: {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface activateDeactivateResponse {
  userActualizado: {
    id: string;
    is_active: boolean;
  };
}

export interface softDeleteUser {
  message: string;
}

export interface changeRol {
  userActualizado: {
    id: string;
    role_id: string;
  };
}

export interface registerEmploye {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export interface registerEmployeResponse {
  id: string;
  name: string;
  lastname: string;
  role_id: string;
  role_name: string;
  company_id: string;
  is_active: boolean;
}
