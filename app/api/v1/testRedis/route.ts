import { redisGet } from 'lib/redis/redis';
import { NextRequest, NextResponse } from 'next/server';

// Define a cache key
const cacheKey = 'drops_cache';

// Define the route handler function
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Check if the request method is GET
    if (req.method !== 'GET') {
      return NextResponse.json('error: Method Not Allowed', { status: 405 });
    }

    // Check if the response is available in Redis cache
    const cachedResponse = await redisGet(cacheKey);

    if (cachedResponse) {
      // If found in cache, return the cached response
      return NextResponse.json(JSON.parse(cachedResponse));
    } else {
      // If not found in cache, return a response indicating it's not in cache
      return NextResponse.json({ message: 'Data not found in cache' });
    }
  } catch (error) {
    // Handle any errors that may occur
    console.error('An error occurred:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
