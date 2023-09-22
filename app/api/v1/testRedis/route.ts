// Import necessary dependencies
import { NextRequest, NextResponse } from "next/server";
import { redis, redisGet, redisSet } from "lib/redis/redis";

// Create a Supabase

// Promisify Redis get and set methods

// Define the route handler function
export async function GET(req:NextRequest) {
  if (req.method !== 'GET') {
    return NextResponse.json('error: Method Not Allowed', { status: 405 });
  }
  const cacheKey = "drops_cache"; // Specify a cache key

  // Check if the response is available in Redis cache
  const cachedResponse = await redisGet(cacheKey);
  if (cachedResponse) {
    return NextResponse.json(JSON.parse(cachedResponse));
  } else {
    return false;
  }
}
