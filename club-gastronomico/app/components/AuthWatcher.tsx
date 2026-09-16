"use client";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";

export function AuthWatcher() {
  const { data: session } = useSession();

  useEffect(() => {
    // Solo para errores de token - aquí SÍ debe mostrar confirmación
    if (session?.error === "RefreshAccessTokenError") {
      // Esta llamada DEBE mostrar la página de confirmación
      signOut({
        redirect: true,
        callbackUrl: "/",
      });
    }
  }, [session]);
  return null;
}
