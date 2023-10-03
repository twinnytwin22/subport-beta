// app/api/getProfilesWithDrops/route.js

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from 'lib/constants';
export async function GET(req:NextRequest) {

  if (req.method !== 'GET') {
    return NextResponse.json('error: Method Not Allowed', { status: 405 });
  }

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId')
  if (userId) {
  const { data: settings, error } = await supabase.from('artist_settings').select('spotify_url').eq('user_id', userId).maybeSingle();

  if (error) {
    console.error(error);
    return NextResponse.json({'Error fetching data': 500});
  }

  //const filteredProfiles = users?.filter((user) => user.drops.length > 1);

  if(settings){
    return NextResponse.json({ data: settings });

  }

  return new Error('Error fetching Artist Data')
}
}