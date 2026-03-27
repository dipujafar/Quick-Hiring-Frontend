import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/admin/auth/login'];

export function proxy(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  const isAdminRoot = pathname === '/admin';
  const isAuthenticated = Boolean(accessToken);

  // 1. Redirect unauthenticated users → login
  if (!isAuthenticated && !isPublicRoute) {
    const loginUrl = new URL('/admin/auth/login', origin);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Redirect authenticated users away from login
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL('/admin/jobs', origin));
  }

  // 3. Redirect /admin → /admin/jobs
  if (isAuthenticated && isAdminRoot) {
    return NextResponse.redirect(new URL('/admin/jobs', origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};