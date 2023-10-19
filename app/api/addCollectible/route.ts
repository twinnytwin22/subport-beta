import { redis } from 'lib/redis/redis';
import { NextResponse } from 'next/server';
import { promisify } from 'util';

// Promisify Redis get and set methods
const redisGet = promisify(redis.get).bind(redis);
const redisSet = promisify(redis.set).bind(redis);

export async function GET() {
  const cacheKey = 'drops_cache'; // Specify a cache key

  // Retrieve the existing data from Redis cache
  const cachedResponse = await redisGet(cacheKey);

  if (cachedResponse) {
    // Parse the JSON data into an object
    const existingData = JSON.parse(cachedResponse);

    // Add a new collection to the object
    existingData.newCollection = [
      /* your new data here */
    ];

    // Convert the updated object back to a JSON string
    const updatedData = JSON.stringify(existingData);

    // Store the updated JSON string in the Redis cache
    await redisSet(cacheKey, updatedData);

    return NextResponse.json(existingData);
  }

  return NextResponse.json({ ok: true });
}
