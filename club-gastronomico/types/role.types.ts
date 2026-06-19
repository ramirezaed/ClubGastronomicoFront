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
