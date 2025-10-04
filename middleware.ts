import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect routes under /admin or /Dashboard/Gestion/users etc.
  if (pathname.startsWith("/admin") || pathname.startsWith("/Dashboard/Gestion")) {
    const token = req.cookies.get("token")?.value;
    // In a real app verify token; here we mock: only token 'admintoken' allowed
    if (!token || token !== "admintoken") {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/signin";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/Dashboard/Gestion/:path*"],
};
