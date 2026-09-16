// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { Role } from "@/types/auth.types";

const ROLE_HOME: Record<Role, string> = {
  SuperAdmin: "/users",
  owner: "/dashboard",
  employee: "/orders",
};

const ROLE_PREFIXES: Record<Role, string[]> = {
  SuperAdmin: ["/users", "/companies", "/plans"],
  owner: ["/dashboard", "/categories", "/employees", "/reports"],
  employee: ["/orders", "/register-order"],
};

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // SI ESTÁ EN LOGIN, NO HACER NADA (evita el bucle)
    if (pathname === "/login") {
      return NextResponse.next();
    }

    // Si el token tiene error de refresh y NO está en login, redirigir al login
    if (token?.error === "RefreshAccessTokenError") {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    // Landing pública
    if (pathname === "/") {
      if (!token) {
        return NextResponse.next();
      }
      const role = token.user.role_name as Role;
      return NextResponse.redirect(new URL(ROLE_HOME[role], req.url));
    }

    // Si no hay token, redirigir al login
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Verificar roles
    const role = token?.user?.role_name as Role;
    const isUnauthorized = (Object.entries(ROLE_PREFIXES) as [Role, string[]][]).some(
      ([r, prefixes]) => r !== role && prefixes.some((p) => pathname.startsWith(p)),
    );

    if (isUnauthorized) {
      return NextResponse.redirect(new URL(ROLE_HOME[role], req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        // Permitir acceso a login y root sin token
        if (pathname === "/" || pathname === "/login") {
          return true;
        }
        // Para otras rutas, necesita token
        return !!token;
      },
    },
  },
);

export const config = {
  matcher: [
    "/",
    "/login",
    "/users/:path*",
    "/companies/:path*",
    "/plans/:path*",
    "/dashboard/:path*",
    "/menu/:path*",
    "/categories/:path*",
    "/employees/:path*",
    "/reports/:path*",
    "/orders/:path*",
    "/register-order/:path*",
  ],
};
