// src/hooks/useAuth.ts
import { signIn, signOut } from "next-auth/react";

import { LoginCredentials } from "@/types/auth.types";

export const useAuth = () => {
  const login = async (credentials: LoginCredentials) => {
    const result = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });

    if (result?.error) {
      throw new Error();
    }
    window.location.href = "/";
  };

  const logout = async () => {
    await signOut({ redirect: false });
    window.location.href = "/";
  };

  return { login, logout };
};
