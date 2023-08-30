import { NextResponse } from "next/server";
import { redis, redisGet, redisSet } from "lib/redis/redis";
import { supabaseApi } from "lib/constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const refreshCache = searchParams.get("refreshCache");
  try {
    const cacheKey = "creators_cache"; // Specify a cache key for profiles with drops

    // Check if the query parameter "refresh" is set to true
    if (refreshCache) {
      // Delete the cache if the "refresh" parameter is set to true

      await redis.del(cacheKey);
    }

    // Check if the response is available in Redis cache
    const cachedResponse = await redisGet(cacheKey);
    if (cachedResponse && !refreshCache) {
      console.log("Cache Hit");
      return NextResponse.json(JSON.parse(cachedResponse));
    }

    const { data: users, error } = await supabaseApi.from("profiles").select(`
      id, city, state, country,
      drops (
        *
      )`);

    if (error) {
      console.error("Error fetching profiles with drops:", error);
      return new Response("Error fetching profiles with drops");
    }

    const filteredProfiles = users?.filter((user) => user.drops.length > 1);

    // Store the response in Redis cache
    await redisSet(cacheKey, JSON.stringify(filteredProfiles));

    return new Response(JSON.stringify(filteredProfiles));
  } catch (error) {
    console.error("Error fetching profiles with drops:", error);
    return new Response("Error fetching profiles with drops");
  }
}
