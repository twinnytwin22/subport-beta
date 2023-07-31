import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
let data = { record: { following_id: "", follower_id: "", created_at: "" } };
const supabaseApi = createRouteHandlerClient({ cookies });

export async function GET(req: Request) {
  return NextResponse.json({
    status: 200,
    following_id: data.record.following_id || null,
    follower_id: data.record?.follower_id || null,
    created_id: data.record.created_at || null,
  });
}

export async function POST(request: Request) {
  const req = await request.json();
  const { following_id, follower_id, created_at } = req.data;

  // Insert the notification into the Supabase table
  try {
    const { data, error } = await supabaseApi.from("notifications").insert([
      {
        user_id: following_id,
        message: "You have a new follower.",
        created_at,
      },
    ]);

    if (error) {
      // Handle the error if the insertion fails
      console.error("Error inserting notification:", error);
      return NextResponse.json({
        status: 500,
        error: "Failed to insert notification.",
      });
    }

    return NextResponse.json({
      status: 200,
      data,
      message: "New Follower for user",
    });
  } catch (error) {
    console.error("Error inserting notification:", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to insert notification.",
    });
  }
}
