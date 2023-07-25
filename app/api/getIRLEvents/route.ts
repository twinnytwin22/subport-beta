// Import necessary dependencies
import { NextResponse } from "next/server";
import { readContractURIs } from "lib/hooks/readContractURIs";
import { redis, redisGet, redisSet } from "lib/redis/redis";
import { supabaseApi } from "lib/providers/supabase/supabaseClient";
// Create a Supabase

// Define the route handler function
export async function GET() {
  try {
    const cacheKey = "irl_events_cache"; // Specify a cache key

    // Check if the response is available in Redis cache
    const cachedResponse = await redisGet(cacheKey);
    if (cachedResponse) {
      return NextResponse.json(JSON.parse(cachedResponse));
    }

    const { data: events, error } = await supabaseApi
      .from("irl_events")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error("Error fetching drops");
    }

    if (events) {
      try {
        // Store the response in Redis cache
        await redisSet(cacheKey, JSON.stringify(events));

        return new Response(JSON.stringify(events));
      } catch (error) {
        console.error("Error fetching metadata:", error);
        return new Response("Error: fetching metadata");
      }
    }
  } catch (error) {
    console.error("Error fetching drops:", error);
    return new Response("Error fetching drops");
  }
}