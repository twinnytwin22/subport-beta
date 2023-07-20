import { createClient } from "@supabase/supabase-js";
import { readSingleContractURI } from "lib/hooks/readSingleContractURI";
import { redis } from "lib/redis/redis";
import { NextResponse } from "next/server";
import { promisify } from "util";

export const revalidate = 0;

// Promisify Redis get and set methods
const redisGet = promisify(redis.get).bind(redis);
const redisSet = promisify(redis.set).bind(redis);
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contractAddress = searchParams.get("contractAddress");

  const cacheKey = "drops_cache"; // Specify a cache key
  let cachedData = undefined;
  // Check if the response is available in Redis cache
  const cachedResponse = await redisGet(cacheKey);
  if (cachedResponse) {
    cachedData = JSON.parse(cachedResponse);
    const existingData = cachedData.dropsWithMetaData;
    const existingDrop = existingData.find(
      (drop: any) => drop.drop.contract_address === contractAddress
    );

    if (existingDrop) {
      return NextResponse.json(existingDrop);
    }
  }

  try {
    const metaDataPromise = readSingleContractURI(contractAddress!);
    const supabasePromise = supabase
      .from("drops")
      .select("*")
      .eq("contract_address", contractAddress)
      .limit(1)
      .single();

    // Wait for both promises to resolve or timeout
    const [metaData, { data: drop }] = await Promise.allSettled([
      metaDataPromise,
      supabasePromise,
      new Promise((resolve) => setTimeout(resolve, 1000)), // Timeout of 1 second
    ]).then((results) =>
      results
        .filter(({ status }) => status === "fulfilled")
        .map(({ value }: any) => value)
    );

    if (drop && metaData) {
      const contractAddress = drop.contract_address;
      const newMeta = metaData?.info?.metadata;

      if (contractAddress) {
        try {
          const dropWithMetaData = {
            drop,
            metaData: newMeta,
          };

          const updatedData = updateData(dropWithMetaData, cachedData);

          await redisSet(cacheKey, JSON.stringify(updatedData));

          return NextResponse.json({
            drop,
            dropWithMetaData,
          });
        } catch (error) {
          console.error("Error fetching single contract URI:", error);
        }
      } else {
        return NextResponse.json({ error: "Not Found", drop: null });
      }
    }
  } catch (error) {
    console.error("Error fetching single collectible:", error);
  }

  return NextResponse.json({ error: "Not Found", drop: null });
}

function updateData(newData: any, cachedData: any) {
  const existingData = cachedData?.dropsWithMetaData || [];
  const updatedData = {
    dropsWithMetaData: [...existingData, newData],
  };

  return updatedData;
}
