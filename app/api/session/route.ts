import { getServerSession } from "next-auth";
import { getAuthOptions } from "lib/auth";
import { NextResponse } from "next/server";

const authOptions = getAuthOptions();

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  return NextResponse.json({
    authenticated: !!session,
    session,
  });
}
