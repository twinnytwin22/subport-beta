import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { readContractURIs } from "lib/hooks/readContractURIs";
import { redis } from "lib/redis/redis";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function GET() {
  let slug = "undefined";
  const addressArray: string[] = [""];
  await redis.sadd("contract_addresses", addressArray);
  const address = "0x658d2ce7c5c05dd1f128bf54ce45bc3a49a37e80";

  const cachedValue = await redis.sismember("contract_addresses", address);
  // Handle the case when no slug is provided
  if (cachedValue === 0) {
    await redis.sadd("contract_addresses", address);
    return new Response(`success: ${address}`);
  }
  return new Response("We are good here");
  // Check if the array exists in Redis
  // const arrayExists = await new Promise((resolve) => {
  //  redis.exists(slug, (error, result) => {
  //   if (error) {
  //     console.error("Redis error:", error);
  //     resolve(false);
  //   } else {
  //     resolve(result === 1);
  //  }
  // });
  // });

  // if (arrayExists) {
  // const cachedValue = await redis.lrange(slug, 0, -1);

  //  if (cachedValue.length > 0) {
  //  return NextResponse.json({ drops: cachedValue });
  //   }
  // }
}
