import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // check the publicly visible paths
  const isPublicPath = path === "/login" || path === "/signup";

  // check if user already has a token in cookies or not
  const token = request.cookies.get("token")?.value || "";

  // redirect the logged in user to the homepage
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // redirect the loggedOut or new user to the login page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile", "/profile/:path*", "/login", "/signup"],
};
