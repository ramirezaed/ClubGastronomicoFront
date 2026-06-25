export interface role {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
}
export interface GetRolesResponse {
  message: string;
  roles: role[];
}

export interface softDeleteRole {
  message: string;
}

export interface registerRole {
  name: string;
  description: string;
}
export interface updateRole {
  description: string;
}
