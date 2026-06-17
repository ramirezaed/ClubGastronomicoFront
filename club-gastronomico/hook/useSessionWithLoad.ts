// hooks/useSessionWithLoad.ts
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useSessionWithLoad() {
  const { data: session, status, update } = useSession();
  const [mounted, setMounted] = useState(false);
  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsClientReady(true);

    // Forzar actualización de la sesión cuando el cliente esté listo
    if (status === "unauthenticated") {
      update();
    }
  }, [update, status]);

  return {
    session,
    status,
    mounted,
    isClientReady,
    isLoading: !mounted || status === "loading",
    isAuthenticated: mounted && status === "authenticated",
    user: session?.user,
    // Para forzar actualización manual si es necesario
    updateSession: update,
  };
}
