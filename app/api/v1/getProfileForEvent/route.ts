// app/api/getProfilesWithDrops/route.js

import { NextResponse } from 'next/server';
import { supabase } from 'lib/constants';

export async function GET(request:Request) {
const { searchParams } = new URL(request.url);
const userId = searchParams.get("userId");
    let { data: eventProfiles, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error(error);
    return NextResponse.json({'Error fetching data': 500});
  }

  return NextResponse.json(eventProfiles);
}
