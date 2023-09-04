import { readSingleContractURI } from "lib/hooks/readSingleContractURI";
import { supabaseApi } from "lib/constants";
import { redisGet } from "lib/redis/redis";
import { NextResponse } from "next/server";

export const revalidate = 0;
export const dynamic = 'force-dynamic'
// Promisify Redis get and set methods

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

 
  } else {

    if (!slug) {
      return NextResponse.json({ 'Error': 'Missing or empty slug', 'status': 400 });
    }
    try {
      const { data: drop, error } = await supabaseApi
        .from("drops")
        .select("*")
        .eq("slug", slug);

      if (drop !== null && drop.length > 0) {
        console.log(drop, "DROP___");
        const metaData = await readSingleContractURI(
          drop[0]?.contract_address!
        );
        if (metaData) {
          const newDrop = {
            drop,
            metaData,
          };
          return NextResponse.json(newDrop);
        }
      } else if (error) {
        return NextResponse.json({ error });
      }
    } catch (error) {
      console.error("Error fetching single contract URI:", error);
    }

    return NextResponse.json({ error: "Not Found", drop: null });
  }
}
