import { NextResponse } from 'next/server';
import { useAuth } from './utils/functions';
import { store } from './redux/store';


export function middleware(req) {
  const auth = store.getState()
  // const token = auth.access; // Adjust if you're storing token differently
  console.log(auth)
  // const { pathname } = req.nextUrl;

  // // Protect specific routes
  // if (pathname.startsWith('/dashboard')) {
  //   if (!token) {
  //     return NextResponse.redirect(new URL('/', req.url));
  //   }
  // }

  // // Proceed as normal if token is present or route doesn't need protection
  // return NextResponse.next();
}

// Configuration to run middleware on specific routes
export const config = {
  matcher: ['/dashboard/:path*', '/protected-route/:path*'], 
};



