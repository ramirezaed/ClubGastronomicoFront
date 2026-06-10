"use client";

import Footer from "@/app/components/landing/Footer";
import { SessionProvider } from "next-auth/react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-50">{children}</div>
      <Footer />
    </SessionProvider>
  );
}
