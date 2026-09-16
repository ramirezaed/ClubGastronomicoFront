// "use client";

// import { SessionProvider } from "next-auth/react";
// import { AuthWatcher } from "@/app/components/AuthWatcher";

// export function Providers({ children }: { children: React.ReactNode }) {
//   return (
//     <SessionProvider>
//       <AuthWatcher />
//       {children}
//     </SessionProvider>
//   );
// }

// app/providers.tsx
"use client";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { AuthWatcher } from "@/app/components/AuthWatcher";

export function Providers({ children, session }: { children: React.ReactNode; session: Session | null }) {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <AuthWatcher />
      {children}
    </SessionProvider>
  );
}
