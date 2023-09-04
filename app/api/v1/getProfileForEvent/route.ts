import { NextResponse } from 'next/server';
import { supabase } from 'lib/constants';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  // Check if userId is missing or empty
  if (!userId) {
    return NextResponse.json({ 'Error': 'Missing or empty userId', 'status': 400 });
  }

  try {
    let { data: eventProfiles } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    return NextResponse.json(eventProfiles);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ 'Error fetching data': 500 });
  }
}
