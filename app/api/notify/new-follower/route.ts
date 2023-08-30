import { supabaseAdmin } from "lib/constants";
import { NextResponse } from "next/server";
let message = "";
let data = "";
let related_user = "";

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
    let type = "follow";
    message = "You have a new follower";
    related_user = follower_id;
    // Insert the new follower into the notifications table
    const { data: newNotification, error } = await supabaseAdmin
      .from("notifications")
      .insert({
        user_id: following_id,
        message,
        related_user,
        type,
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
