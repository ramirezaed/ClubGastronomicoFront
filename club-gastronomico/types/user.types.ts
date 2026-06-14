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
  //   message: string;
  userActualizado: {
    id: string;
    is_active: boolean;
  };
}

export interface softDeleteUser {
  message: string;
}
