import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { headers } from "next/headers";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { MiddlewareFactory } from "./types";
const blocked = ["create", "settings", "test"];

export const supaMiddleware: MiddlewareFactory = (next: NextMiddleware) => {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    const host = req.headers.get("host");
    const response = await next(req, _next);
    const res = NextResponse.next();

    // Your current middleware code
    const supabase = createMiddlewareClient({ req, res });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (
      (!session && req.nextUrl.pathname.startsWith("/create")) ||
      req.nextUrl.pathname.startsWith("/settings") ||
      req.nextUrl.pathname.startsWith("/test")
    ) {
      // Redirect to '/' if session doesn't exist and pathname is blocked
      return NextResponse.redirect(host!);
    } else {
      // Return rewritten response if session doesn't exist
      return res;
    }
  };
};
