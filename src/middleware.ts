import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { UserRole } from "@/utils/roles";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  const publicRoutes = ["/", "/login", "/register"];
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAdminRoute = pathname.startsWith("/admin");

  // phải login là admin
  if (isAdminRoute) {
    // không login, redirect về /
    if (!session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    // login là user, redirect về /
    if (session.user.role !== UserRole.ADMIN) {
      
      return NextResponse.redirect(new URL("/", req.url));
    }
    
    return NextResponse.next();
  }

  // không phải admin, không phải public
  if (!isPublicRoute && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // đã login mà vào trang login/register, redirect về /
  if ((pathname === "/login" || pathname === "/register") && session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // bảo vệ tất cả routes trừ static files
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};