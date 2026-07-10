"use client";

import { SessionProvider } from "next-auth/react";
import { AuthWatcher } from "@/app/components/AuthWatcher";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthWatcher />
      {children}
    </SessionProvider>
  );
}
