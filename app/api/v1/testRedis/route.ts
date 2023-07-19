// Import necessary dependencies
import { NextResponse } from "next/server";
import { promisify } from "util";
import { redis } from "lib/redis/redis";

// Create a Supabase

// Promisify Redis get and set methods
const redisGet = promisify(redis.get).bind(redis);

// Define the route handler function
export async function GET() {
  const cacheKey = "drops_cache"; // Specify a cache key

  // Check if the response is available in Redis cache
  const cachedResponse = await redisGet(cacheKey);
  if (cachedResponse) {
    return NextResponse.json(JSON.parse(cachedResponse));
  } else {
    return false;
  }
}
