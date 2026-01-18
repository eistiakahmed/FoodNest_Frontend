import { NextResponse } from 'next/server';

// Define protected routes
const protectedRoutes = ['/admin', '/admin/add-food'];
const authRoutes = ['/login', '/signup'];

export default function proxy(request) {
  const { pathname } = request.nextUrl;
  
  // Get authentication token from cookies
  const token = request.cookies.get('foodnest_token')?.value;
  const userCookie = request.cookies.get('foodnest_auth')?.value;
  
  // Check if user is authenticated
  const isAuthenticated = !!(token && userCookie);
  
  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Redirect unauthenticated users from protected routes to login
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // Redirect authenticated users from auth routes to foods page
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/foods', request.url));
  }
  
  return NextResponse.next();
}

// Configure which routes the proxy should run on
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