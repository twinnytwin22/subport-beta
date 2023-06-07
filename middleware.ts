import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const path = req.nextUrl.pathname;

  if (path === "/") {
    return res;
  }

  const protectedPaths = ["create", "settings"];

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log(session, "middleware");
  if (
    !session &&
    protectedPaths.some((protectedPath) => path.includes(protectedPath))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}
