export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role_name: string;
  company_id: string | null;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export type Role = "SuperAdmin" | "owner" | "employee";

export interface IRegisterUser {
  name: string;
  lastname: string;
  email: string;
  password: string;
}
export interface IRegisterUserResponse {
  message: string;
}
