import { NextResponse, NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // const isPublic = pathname.startsWith("/login");

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }
  // if (!isPublic) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
