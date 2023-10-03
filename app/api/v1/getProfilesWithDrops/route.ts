// app/api/getProfilesWithDrops/route.js

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from 'lib/constants';

export const dynamic = 'force-dynamic'
export async function GET(req:NextRequest) {
  if (req.method !== 'GET') {
    return NextResponse.json('error: Method Not Allowed', { status: 405 });
  }
  const { data: users, error } = await supabase.from('profiles').select(`
    id, city, state, country, is_artist,
    drops (
      user_id
    )`);

  if (error) {
    console.error(error);
    return NextResponse.json({'Error fetching data': 500});
  }

  const filteredProfiles = users?.filter((user) => user.drops.length > 1);
  return NextResponse.json({ data: filteredProfiles });
}
