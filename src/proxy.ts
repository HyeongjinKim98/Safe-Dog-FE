import { NextResponse, NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = pathname.startsWith("/login");
  // login 페이지로 Redirect
  if (!isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: "/about/:path*",
};
