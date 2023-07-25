import { NextResponse } from "next/server";
import { redis, redisGet, redisSet } from "lib/redis/redis";
import { supabaseApi } from "lib/providers/supabase/supabaseClient";

export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const refreshCache = searchParams.get("refreshCache");
  const cacheKey = "irl_events_cache"; // Specify a cache key for all users' data

  try {
    // Check if the query parameter "refreshCache" is set to true
    if (refreshCache) {
      // Delete the cache if the "refreshCache" parameter is set to true
      await redis.del(cacheKey);
    }
    // Check if the response is available in Redis cache
    const cachedResponse = await redisGet(cacheKey);
    if (cachedResponse && !refreshCache) {
      console.log("Cache Hit");
      return NextResponse.json(JSON.parse(cachedResponse));
    }

    let { data: events, error: eventsError } = await supabaseApi
      .from("irl_events")
      .select("*");

    if (eventsError) {
      console.error("Error fetching events:", eventsError);
      return new Response("Error fetching events");
    }

    // Store the response in Redis cache
    await redisSet(cacheKey, JSON.stringify(events));

    return new Response(JSON.stringify(events));
  } catch (error) {
    console.error("Error fetching events:", error);
    return new Response("Error fetching events");
  }
}
