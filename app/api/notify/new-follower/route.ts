import { NextResponse } from "next/server";
import { supabase } from "lib/constants";
let message = "";
let data = "";

export async function GET(req: Request) {
  return NextResponse.json({
    status: 200,
    data,
    message,
  });
}

export async function POST(request: Request) {
  const payload = await request.json();

  if (payload.type === "INSERT" && payload.table === "followers") {
    const { following_id, follower_id } = payload.record;

    message = "You have a new follower";
    // Insert the new follower into the notifications table
    const { data: newNotification, error } = await supabase
      .from("notifications")
      .insert({
        user_id: following_id,
        message,
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      return NextResponse.json("Failed to insert new notification");
    }
    data = newNotification;
    return NextResponse.json({
      status: 200,
      data,
      message: `New Follower for`,
    });
  }

  return NextResponse.json({
    status: 200,
    message: "No action taken",
  });
}
