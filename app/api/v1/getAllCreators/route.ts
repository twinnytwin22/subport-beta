import { supabaseApi } from 'lib/constants';
import { redis, redisGet, redisSet } from 'lib/redis/redis';
import { NextResponse } from 'next/server';

export const revalidate = 30;
export const dynamic = 'force-dynamic';
//export const dynamic = 'force-dynamic'
export async function GET(req: Request) {
  if (req.method !== 'GET') {
    return NextResponse.json('error: Method Not Allowed', { status: 405 });
  }
  const { searchParams } = new URL(req.url);
  const refreshCache = searchParams.get('refreshCache');
  try {
    const cacheKey = 'creators_cache'; // Specify a cache key for profiles with drops

    // Check if the query parameter "refresh" is set to true
    if (refreshCache) {
      // Delete the cache if the "refresh" parameter is set to true

      await redis.del(cacheKey);
    }

    // Check if the response is available in Redis cache
    const cachedResponse = await redisGet(cacheKey);
    if (cachedResponse && !refreshCache) {
      console.log('Cache Hit');
      return NextResponse.json(JSON.parse(cachedResponse));
    }

    const { data: users, error } = await supabaseApi
      .from('profiles')
      .select(
        `
      id, city, state, country, username, website, avatar_url, is_artist,
      drops ( 
        user_id
      )`
      )
      .not('drops.user_id', 'is', null);
    // .filter('drops.user_id', 'is', null);

    if (error) {
      console.error('Error fetching profiles with drops:', error);
      return NextResponse.json('Error fetching profiles with drops');
    }

    const filteredProfiles = users?.filter(
      (user) => user.drops.length > 0 && user
    );

    // Store the response in Redis cache
    await redisSet(cacheKey, JSON.stringify(filteredProfiles));

    return NextResponse.json(filteredProfiles);
  } catch (error) {
    console.error('Error fetching profiles with drops:', error);
    return NextResponse.json('Error fetching profiles with drops');
  }
}
