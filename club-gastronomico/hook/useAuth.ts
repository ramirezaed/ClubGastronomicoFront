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
    // Actualizar la sesión para obtener los datos más recientes
    await update();
    // Redirigir según rol - lo haremos después de obtener la sesión actualizada
    router.push("/");
  };

  const logout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return { login, logout };
};
