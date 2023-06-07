import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path === "/") {
    return NextResponse.next();
  }

  const protectedPaths = ["create", "account", "settings"];

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (session) {
    session.sub = session as any;
  }

  if (
    !session &&
    protectedPaths.some((protectedPath) => path.includes(protectedPath))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
