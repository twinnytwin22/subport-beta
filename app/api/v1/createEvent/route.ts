import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { redisGet, redisSet } from 'lib/redis/redis';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { Database } from 'types/database.types';

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json('error: Method Not Allowed', { status: 405 });
  }
  const supabaseApi = createRouteHandlerClient<Database>({ cookies });
  const { eventData } = await req.json();
  const cacheKey = 'events_cache';

  const { data: event, error: eventError } = await supabaseApi
    .from('events')
    .insert([eventData])
    .select();

  if (event) {
    // Fetch the existing array from the Redis cache
    const cachedData = await redisGet(cacheKey);

    // Parse the cached data into an array or initialize an empty array if the cache is empty
    const existingData = cachedData ? JSON.parse(cachedData) : [];

    // Append the new event to the existing array
    existingData.push(event[0]);

    // Set the updated array back to the Redis cache
    await redisSet(cacheKey, JSON.stringify(existingData));

    return NextResponse.json({ data: event, status: 'success', error: null });
  }

  return NextResponse.json({ error: eventError, status: 'error', data: null });
}
