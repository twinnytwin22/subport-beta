// Import necessary dependencies
import { NextResponse } from "next/server";
import { readContractURIs } from "lib/hooks/readContractURIs";
import { redis, redisGet, redisSet } from "lib/redis/redis";

import { supabaseApi } from "lib/providers/supabase/supabaseClient";

// Create a Supabase

// Promisify Redis get and set methods

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

    const { data: drops, error } = await supabaseApi
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

          return new Response(JSON.stringify(response));
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
