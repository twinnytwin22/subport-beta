import { headers } from 'next/headers';
export const dynamic = 'force-dynamic';
export const revalidate = 5;
async function page() {
  const host = headers().get('host');
  const protocol = process?.env.NODE_ENV === 'development' ? 'http' : 'https';
  const res = await fetch(`${protocol}://${host}/api/v1/getEvents`, {
    method: 'GET',
    /// headers: { "Content-Type": "application/json" },
    cache: 'no-store'
  });

  const data = await res.json();

  return <div>{JSON.stringify(data)}</div>;
}

export default page;
