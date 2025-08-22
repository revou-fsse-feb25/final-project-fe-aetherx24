import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /dashboard, /login)
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const publicPaths = ['/'];

  // Define protected paths that require authentication
  const protectedPaths = ['/dashboard'];

  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some(protectedPath => 
    path.startsWith(protectedPath)
  );

  // Check if the current path is public (login page)
  const isPublicPath = publicPaths.includes(path);

  // Get the token from cookies or localStorage (we'll use cookies for SSR)
  const token = request.cookies.get('jwt_token')?.value;

  // If trying to access protected route without token, redirect to login
  if (isProtectedPath && !token) {
    console.log(`Middleware: Redirecting ${path} to login (no token)`);
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If trying to access login page with valid token, redirect to dashboard
  if (isPublicPath && token && path === '/') {
    console.log(`Middleware: Redirecting ${path} to dashboard (has token)`);
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // For all other cases, continue with the request
  console.log(`Middleware: Allowing access to ${path}`);
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
