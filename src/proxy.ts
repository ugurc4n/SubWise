import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Public paths that don't require authentication
  const publicPaths = ["/", "/sign-in", "/sign-up", "/test"];
  const isPublicPath = 
    pathname === "/" ||
    publicPaths.some((path) => path !== "/" && pathname.startsWith(path));

  // Allow API routes
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Get session
  const session = await auth();
  const isAuthenticated = !!session?.user;

  // If not authenticated and trying to access protected route, redirect to sign-in
  if (!isAuthenticated && !isPublicPath) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // If authenticated and trying to access auth pages, redirect to dashboard
  if (isAuthenticated && (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up"))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
