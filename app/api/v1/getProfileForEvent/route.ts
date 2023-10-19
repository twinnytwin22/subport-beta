import { supabase } from 'lib/constants';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  if (req.method !== 'GET') {
    return NextResponse.json('error: Method Not Allowed', { status: 405 });
  }
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  // Check if userId is missing or empty
  if (!userId) {
    return NextResponse.json({ Error: 'Missing or empty userId', status: 400 });
  }

  try {
    let { data: eventProfiles } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    return NextResponse.json(eventProfiles);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ 'Error fetching data': 500 });
  }
}
