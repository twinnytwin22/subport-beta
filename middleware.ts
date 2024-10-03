import { NextFetchEvent, NextRequest } from 'next/server';
import { updateSession } from './lib/providers/supabase/middleware';
//const cache = new Map();
// const ratelimit = new Ratelimit({
//   // ephemeralCache: cache,
//   redis: Redis.fromEnv(),
//   analytics: true,
//   // 5 requests from the same IP in 10 seconds
//   limiter: Ratelimit.slidingWindow(5, '10 s')
// });

export async function middleware(
  req: NextRequest,
  event: NextFetchEvent
): Promise<Response | undefined> {
 // const ip = req.ip ?? '127.0.0.1';

 // const { pathname, host, hostname, basePath, protocol } = req.nextUrl;
  //console.log(`${req.nextUrl.protocol}//${req.nextUrl.host}/`);

  // const { success, limit, remaining, reset } = await ratelimit.blockUntilReady(ip, 30_000);

  // if (!success) {
  //   return NextResponse.json("Unable to process at this time");
  // }

  //const res = NextResponse.next();


  //console.log(session);
  if (
    req.nextUrl.pathname.startsWith('/create') ||
    req.nextUrl.pathname.startsWith('/settings') ||
    req.nextUrl.pathname.startsWith('/explore')
  ) {
    // if (!session) {
    //   return NextResponse.redirect(`${protocol}//${host}/`);
    // }
  }

  // res.headers.set("X-RateLimit-Limit", limit.toString());
  // res.headers.set("X-RateLimit-Remaining", remaining.toString());
  //  res.headers.set("X-RateLimit-Reset", reset.toString());

  return await updateSession(req)
}
