import { NextResponse } from "next/server";

let data = "";
let message = "";

export async function GET(req: Request) {
  return NextResponse.json({
    status: 200,
    data,
    message,
  });
}

export async function POST(request: Request) {
  const req = await request.json();

  data = req;

  return NextResponse.json({
    status: 200,
    data,
    message: `New Follower for`,
  });
}
