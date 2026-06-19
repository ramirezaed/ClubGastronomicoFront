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

    // Landing pública
    if (pathname === "/" || pathname === "/login") {
      if (!token) {
        return NextResponse.next();
      }
      const role = token.user.role_name as Role;
      return NextResponse.redirect(new URL(ROLE_HOME[role], req.url));
    }

    const role = token?.user.role_name as Role;
    const isUnauthorized = (Object.entries(ROLE_PREFIXES) as [Role, string[]][]).some(
      ([r, prefixes]) => r !== role && prefixes.some((p) => pathname.startsWith(p)),
    );

    if (isUnauthorized) {
      return NextResponse.redirect(new URL(ROLE_HOME[role], req.url));
    }
  },

  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        if (pathname === "/" || pathname === "/login") {
          return true;
        }
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
