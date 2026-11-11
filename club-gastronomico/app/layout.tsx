import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.options";
import { Providers } from "@/app/providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClubGastronomico",
  description: "",
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="es">
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
