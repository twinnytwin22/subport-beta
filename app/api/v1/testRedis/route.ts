// Import necessary dependencies
import { NextResponse } from "next/server";
import { readContractURIs } from "lib/hooks/readContractURIs";
import { createClient } from "@supabase/supabase-js";
import { promisify } from "util";
import { redis } from "lib/redis/redis";

// Create a Supabase
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Promisify Redis get and set methods
const redisGet = promisify(redis.get).bind(redis);
const redisSet = promisify(redis.set).bind(redis);

// Define the route handler function
export async function GET() {
  try {
    const cacheKey = "drops_cache"; // Specify a cache key

    // Check if the response is available in Redis cache
    const cachedResponse = await redisGet(cacheKey);
    if (cachedResponse) {
      console.log(cachedResponse);

      return NextResponse.json(JSON.parse(cachedResponse));
    }
  } catch (error) {
    console.error("Error fetching drops:", error);
    return new Response("Error fetching drops");
  }
}
