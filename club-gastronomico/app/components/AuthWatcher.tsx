//este componente redirije a la pagina de inicio cuando el token exprira luego de 7 dias
"use client";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";

export function AuthWatcher() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: "/login" });
    }
  }, [session]);
  return null;
}
