import { NextResponse, NextRequest } from "next/server";
import { AuthService } from "@/services/auth_service";
import { createMiddlewareServerClient } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createMiddlewareServerClient(request, response);

  const session = await new AuthService(supabase).getSession();

  if (session) {
    console.log("Middleware Exist Session Path", request.nextUrl.pathname);
  }

  // if (request.nextUrl.pathname.startsWith("/protected")) {
  if (request.nextUrl.pathname === "/") {
    if (!session) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  return response;
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|public/|api/).*)",
  ],
};
