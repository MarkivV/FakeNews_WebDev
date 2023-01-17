import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

// export { withAuth } from "next-auth/middleware"

export default withAuth(function middleware(req: NextRequest) {
    return NextResponse.rewrite(new URL('/admin/posts', req.url))
}, {
  callbacks: {
        authorized: ({ token }) => token?.role === "admin",
  },
});
// export const config = {matcher: ['/admin/posts']}
export const config = { matcher: ["/admin/posts"] }