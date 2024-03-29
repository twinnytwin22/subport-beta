import { supabaseApi } from 'lib/constants';
import { readSingleContractURI } from 'lib/hooks/readSingleContractURI';
import { redisGet } from 'lib/redis/redis';
import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

// Promisify Redis get and set methods

export async function GET(req: NextRequest) {
  try {
    if (req.method !== 'GET') {
      return NextResponse.json('error: Method Not Allowed', { status: 405 });
    }
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    const cacheKey = 'drops_cache'; // Specify a cache key
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
        return NextResponse.json({
          Error: 'Missing or empty slug',
          status: 400
        });
      }

      const { data: drop, error } = await supabaseApi
        .from('drops')
        .select('*')
        .eq('slug', slug);

      if (drop !== null && drop.length > 0) {
        console.log(drop, 'DROP___');
        const metaData = await readSingleContractURI(
          drop[0]?.contract_address!
        );
        if (metaData) {
          const newDrop = {
            drop,
            metaData
          };
          return NextResponse.json(newDrop);
        }
      } else if (error) {
        return NextResponse.json({ error });
      }
    }

    return NextResponse.json({ error: 'Not Found', drop: null });
  } catch (error) {
    console.error('An error occurred:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
