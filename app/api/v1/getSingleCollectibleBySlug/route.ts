import { createClient } from "@supabase/supabase-js";
import { readSingleContractURI } from "lib/hooks/readSingleContractURI";
import { redis } from "lib/redis/redis";
import { NextResponse } from "next/server";
import { promisify } from "util";

// Promisify Redis get and set methods
const redisGet = promisify(redis.get).bind(redis);
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  const cacheKey = "drops_cache"; // Specify a cache key
  let cachedData = undefined;
  // Check if the response is available in Redis cache
  const cachedResponse = await redisGet(cacheKey);
  if (cachedResponse) {
    cachedData = JSON.parse(cachedResponse);
    const existingData = cachedData.dropsWithMetaData;
    const existingDrop = existingData.find(
      (drop: any) => drop.drop.slug === slug
    );

    if (existingDrop) {
      return NextResponse.json(existingDrop);
    }
  }

  try {
    const { data: drop, error } = await supabase
      .from("drops")
      .select("*")
      .eq("slug", slug);

    if (drop !== null && drop.length > 0) {
      console.log(drop, "DROP___");
      const metaData = await readSingleContractURI(slug!);

      if (metaData) {
        const dropWithMetaData = {
          drop,
          metaData,
        };
        return NextResponse.json({
          drop: dropWithMetaData,
        });
      }
    } else if (error) {
      return NextResponse.json({ error });
    }
  } catch (error) {
    console.error("Error fetching single contract URI:", error);
  }

  return NextResponse.json({ error: "Not Found", drop: null });
}
