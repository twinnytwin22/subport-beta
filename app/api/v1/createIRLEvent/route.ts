import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const supabaseApi = createRouteHandlerClient({ cookies });
  const { eventData } = await req.json();

  try {
    const { data: event, error } = await supabaseApi
      .from("irl_events")
      .insert([eventData])
      .select()
      .single();

    if (event) {
      return NextResponse.json({ data: event, status: "success" });
    }
  } catch (error) {
    console.error(error);
    new Response("error: Error sending email");
  }
}
