// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = ['/profile', '/notes'];
const authRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasAuthCookie =
    request.cookies.get('session') ||
    request.cookies.get('accessToken') ||
    request.cookies.get('token') ||
    request.cookies.get('refreshToken');

  const hasToken = !!hasAuthCookie;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.includes(pathname);

  if (!hasToken && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (hasToken && isAuthRoute) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
