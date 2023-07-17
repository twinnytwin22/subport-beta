// Import necessary dependencies
import { NextResponse } from "next/server";
import { readContractURIs } from "lib/hooks/readContractURIs";
import { createClient } from "@supabase/supabase-js";
import { promisify } from "util";
import { redis } from "lib/redis/redis";

// Create a Supabase
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Promisify Redis get and set methods
const redisGet = promisify(redis.get).bind(redis);
const redisSet = promisify(redis.set).bind(redis);

// Define the route handler function
export async function GET(request: Request) {
  try {
    const cacheKey = "drops_cache"; // Specify a cache key

    // Check if the response is available in Redis cache
    const cachedResponse = await redisGet(cacheKey);
    if (cachedResponse) {
      return NextResponse.json(JSON.parse(cachedResponse));
    }

    const { data: drops, error } = await supabase
      .from("drops")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error("Error fetching drops");
    }

    if (drops) {
      const contractAddresses = drops.map((drop: any) => drop.contract_address);

      if (contractAddresses) {
        try {
          const metaData = await readContractURIs(contractAddresses);

          await new Promise((resolve) => setTimeout(resolve, 1000));

          const dropsWithMetaData = drops.map((drop, index) => ({
            drop,
            metaData: metaData[index]?.metadata,
          }));
          const response = {
            dropsWithMetaData,
            drops,
            contractAddresses,
            metaData,
          };
          await new Promise((resolve) => setTimeout(resolve, 500));

          // Store the response in Redis cache
          await redisSet(cacheKey, JSON.stringify(response));

          return NextResponse.json(response);
        } catch (error) {
          console.error("Error fetching metadata:", error);
          return new Response("Error: fetching metadata");
        }
      }
    }
  } catch (error) {
    console.error("Error fetching drops:", error);
    return new Response("Error fetching drops");
  }
}
