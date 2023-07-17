import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function supaMiddleware(req: NextRequest) {
  const res = NextResponse.rewrite(new URL("/", req.url));
  const user = NextResponse.next();

  // Your current middleware code
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    // Return user if session exists
    return user;
  } else {
    // Return rewritten response if session doesn't exist
    return res;
  }
}
// Recommended middleware code
export function nextMiddleware(request: NextRequest) {
  const origin = request.headers.get("origin");
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
  response.headers.set("Access-Control-Max-Age", "86400");

  console.log("Middleware!");
  console.log(request.method);
  console.log(request.url);

  return response;
}
const supaMatcher = ["/settings", "/create/:path*", "/test"];
const apiMatcher = "/api/:function*";

export const config = (request: NextRequest) => {
  let setConfig = supaMatcher;
  if (
    request.url === "/settings" ||
    request.url.startsWith("/create/") ||
    request.url === "/test"
  ) {
    setConfig = supaMatcher;
    return setConfig;
  } else if (request.url.startsWith("/api/")) {
    return apiMatcher;
  }
  return setConfig;
};

export function middleware(request: NextRequest) {
  if (
    request.url === "/settings" ||
    request.url.startsWith("/create/") ||
    request.url === "/test"
  ) {
    return supaMiddleware(request);
  } else if (request.url.startsWith("/api/")) {
    return nextMiddleware(request);
  }
}
