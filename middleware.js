import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token'); // Adjust if you're storing token differently
  const { pathname } = req.nextUrl;

  // Protect specific routes
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Proceed as normal if token is present or route doesn't need protection
  return NextResponse.next();
}

// Configuration to run middleware on specific routes
export const config = {
  matcher: ['/dashboard/:path*', '/protected-route/:path*'], 
};



