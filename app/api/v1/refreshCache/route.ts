import { readContractURIs } from "lib/hooks/readContractURIs";
import { createClient } from "@supabase/supabase-js";
import { promisify } from "util";
import { redis } from "lib/redis/redis";

export const revalidate = 0;

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

const redisSet = promisify(redis.set).bind(redis);

export async function GET() {
  try {
    const cacheKey = "drops_cache";
    // Delete the cache if the "refresh" parameter is set to true    // Check if the response is available in Redis cache
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

          return new Response(JSON.stringify(response));
        } catch (error) {
          console.error("Error refreshing cache:", error);
          return new Response("Error: refreshing cache");
        }
      }
    }
  } catch (error) {
    console.error("Error refreshing cache:", error);
    return new Response("Error: refreshing cache");
  }
}
