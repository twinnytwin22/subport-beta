import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { promisify } from "util";
import { redis } from "lib/redis/redis";

export const revalidate = 0;

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

const redisGet = promisify(redis.get).bind(redis);
const redisSet = promisify(redis.set).bind(redis);
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const refreshCache = searchParams.get("refreshCache");
  const cacheKey = "all_users_cache"; // Specify a cache key for all users' data

  try {
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

    let { data: users, error } = await supabase
      .from("profiles")
      .select(
        "id, username, bio, website, avatar_url, wallet_address, city, state, country"
      );

    if (error) {
      console.error("Error fetching users:", error);
      return new Response("Error fetching users");
    }

    // Store the response in Redis cache
    await redisSet(cacheKey, JSON.stringify(users));

    return new Response(JSON.stringify(users));
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response("Error fetching users");
  }
}
