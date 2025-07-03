import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutesPrefixed = ["/profile", "/create-listing", "/your-listings"];

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const sessionCookie = getSessionCookie(req);

  const res = NextResponse.next();

  const isLoggedIn = !!sessionCookie;
  const path = nextUrl.pathname;
  const isOnProtectedRoute = protectedRoutesPrefixed.some(route => path.startsWith(route));

  if (isOnProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
