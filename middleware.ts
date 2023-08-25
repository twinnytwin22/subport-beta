import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, NextRequest, NextFetchEvent } from "next/server";
import countries from "utils/countries.json";
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from "@upstash/redis"
const cache = new Map()
const ratelimit = new Ratelimit({
 // ephemeralCache: cache,
  redis: Redis.fromEnv(),
  analytics: true,
    // 5 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(5,'10 s'),
})

export async function middleware(req: NextRequest, event: NextFetchEvent): Promise<Response | undefined> {
  const ip = req.ip ?? "127.0.0.1";

  const { pathname, host, hostname, basePath, protocol } = req.nextUrl;
  //console.log(`${req.nextUrl.protocol}//${req.nextUrl.host}/`);

  if (req.nextUrl.pathname === `/`) {
    const { nextUrl: url, geo } = req;
    const country: string = geo?.country || "US";
    const city: string = geo?.city || "Phoenix";
    const region: string = geo?.region || "AZ";
    const countryInfo: any = countries.find((x) => x.cca2 === country);
    const currencyCode = Object.keys(countryInfo?.currencies)[0];
    const currency = countryInfo.currencies[currencyCode];
    const languages = Object.values(countryInfo.languages).join(", ");

    url.searchParams.set("country", country);
    url.searchParams.set("city", city);
    url.searchParams.set("region", region);
    url.searchParams.set("currencyCode", currencyCode);
    url.searchParams.set("currencySymbol", currency.symbol);
    url.searchParams.set("name", currency.name);
    url.searchParams.set("languages", languages);

    return NextResponse.rewrite(url);
  }
 // const { success, limit, remaining, reset } = await ratelimit.blockUntilReady(ip, 30_000);

 // if (!success) {
 //   return NextResponse.json("Unable to process at this time");
 // }
  
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  //console.log(session);
if (req.nextUrl.pathname.startsWith("/create") || 
 req.nextUrl.pathname.startsWith("/settings")||
req.nextUrl.pathname.startsWith("/explore")) {
  if (!session) {
      return NextResponse.redirect(`${protocol}//${host}/`);
    } return res
   }

   
//  } else {
 //   return res
 // }

 // res.headers.set("X-RateLimit-Limit", limit.toString());
 // res.headers.set("X-RateLimit-Remaining", remaining.toString());
//  res.headers.set("X-RateLimit-Reset", reset.toString());

}
