import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
    const isProfileRoute = req.nextUrl.pathname.startsWith("/profile");

    // 1. If trying to access admin routes
    if (isAdminRoute) {
      if (!isAuth || token.role !== "admin") {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }
    }

    // 2. If trying to access profile
    if (isProfileRoute) {
      if (!isAuth) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/login",
    },
  }
);

export const config = { 
  matcher: [
    "/admin/dashboard/:path*", 
    "/admin/products/:path*", 
    "/admin/leads/:path*",
    "/profile/:path*"
  ] 
};
