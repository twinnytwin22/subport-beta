// app/api/getProfilesWithDrops/route.js

import { supabase } from 'lib/constants';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) {
  if (req.method !== 'GET') {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is missing' }, { status: 400 });
  }

  try {
    const { data: settings, error } = await supabase
      .from('artist_settings')
      .select('spotify_url')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: 'Error fetching data' },
        { status: 500 }
      );
    }

    if (settings) {
      return NextResponse.json({ data: settings });
    } else {
      return NextResponse.json(
        { error: 'Artist data not found' },
        { status: 404 }
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
