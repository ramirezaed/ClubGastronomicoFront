"use client";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";

export function AuthWatcher() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut({
        redirect: true,
        callbackUrl: "/",
      });
    }
  }, [session]);
  return null;
}
