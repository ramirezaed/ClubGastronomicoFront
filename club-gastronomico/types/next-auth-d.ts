import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role_name: string;
    company_id: string | null;
    accessToken: string;
    refreshToken: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role_name: string;
      company_id: string | null;
    };

    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      email: string;
      name: string;
      role_name: string;
      company_id: string | null;
    };

    accessToken: string;
    refreshToken: string;
  }
}
