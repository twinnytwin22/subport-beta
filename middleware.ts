import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

async function getHeaders(req: NextRequest) {
  const origin = req.headers.get("origin");
  console.log(origin);
  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Allow-Max-Age", "86400");
  return response;
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.rewrite(new URL("/", req.url));
  const user = NextResponse.next();
  await getHeaders(req);

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
