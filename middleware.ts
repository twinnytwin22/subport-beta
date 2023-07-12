import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/", req.url));
  const user = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return user;
  } else {
    return res;
  }
}

export const config = {
  matcher: ["/settings", "/create/:path*", "/test"],
};
