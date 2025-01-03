import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => {
          return request.cookies.getAll().map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          }));
        },
        setAll: (cookieSettings) => {
          cookieSettings.forEach((cookie) => {
            response.cookies.set({
              name: cookie.name,
              value: cookie.value,
              ...cookie.options,
            });
          });
        },
      },
    }
  );

  // 1. 세션 검증 및 자동 갱신
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("session", session);

  // 2. 보호된 경로 체크
  // if (request.nextUrl.pathname.startsWith("/protected")) {
  if (request.nextUrl.pathname === "/") {
    if (!session) {
      // 3. 세션이 없으면 로그인 페이지로 리다이렉트
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  // 4. 정상적인 경우 (세션이 있거나 보호된 경로가 아닌 경우)
  return response;
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: [
    /*
     * 다음 경로들을 제외한 모든 요청 경로와 매칭:
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘)
     * - public 폴더의 파일들
     * - api 라우트
     */
    "/((?!_next/static|_next/image|favicon.ico|public/|api/).*)",
  ],
};
