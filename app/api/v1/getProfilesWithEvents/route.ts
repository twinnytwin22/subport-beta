// app/api/getProfilesWithDrops/route.js

import { NextResponse } from 'next/server';
import { supabase } from 'lib/constants';
export async function GET() {
  const { data: users, error } = await supabase.from('profiles').select(`
    id, city, state, country,
    events (
      user_id
    )`);

  if (error) {
    console.error(error);
    return NextResponse.json({'Error fetching data': 500});
  }

  const filteredEvents = users?.filter((user) => user.events.length > 1);
  return NextResponse.json({ data: filteredEvents });
}
