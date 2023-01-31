// import { withAuth } from "next-auth/middleware";
// import { NextRequest, NextResponse } from "next/server";

// // export { withAuth } from "next-auth/middleware"

// export default withAuth(function middleware(req: NextRequest) {
//     return NextResponse.rewrite(new URL('/admin/:path*', req.url))
// }, {
//   callbacks: {
//         authorized: ({ token }) => token?.role === "admin",
//   },
// });
// // export const config = {matcher: ['/admin/posts']}
// export const config = { matcher: ["/admin/:path*"] }

// import { withAuth } from "next-auth/middleware";
// import { NextRequest, NextResponse } from "next/server";

// // export { withAuth } from "next-auth/middleware"

// export default withAuth(function middleware(req: NextRequest) {
//     return NextResponse.rewrite(new URL('/admin/posts', req.url))
// }, {
//   callbacks: {
//         authorized: ({ token }) => token?.role === "admin",
//   },
// });
// // export const config = {matcher: ['/admin/posts']}
// export const config = { matcher: ["/admin/posts"] }


import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {
  // Redirect if they don't have the appropriate role
  if (
    req.nextUrl.pathname.startsWith("/admin") &&
    req.nextauth.token?.role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};