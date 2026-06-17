// src/hooks/useAuth.ts
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginCredentials } from "@/types/auth.types";

export const useAuth = () => {
  const router = useRouter();
  const { update, data: session } = useSession();

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
