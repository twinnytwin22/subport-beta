import { allGenres } from "lib/content/allGenres";
import React, { Suspense } from "react";
import { getProfilesWithDrops } from "utils/database";
import { headers } from "next/headers";
import EventFeed from "ui/Sections/Explore/Events"
export const revalidate = 0// revalidate this page every 60 seconds


async function Page() {
  const host = headers().get('host')
  const protocol = process?.env.NODE_ENV === "development" ? "http" : "https"
  const res = await fetch(`${protocol}://${host}/api/v1/getCollectibles`, {
    method: "GET",
    /// headers: { "Content-Type": "application/json" },
    cache: 'no-store',
  });

  const eventRes = await fetch(`${protocol}://${host}/api/v1/getEvents`, {
    method: "GET",
    /// headers: { "Content-Type": "application/json" },
    cache: 'no-store',
  });
  const drops = await res.json()
  const events = await eventRes.json()

  const data = await getProfilesWithDrops();

  const filteredDrops = drops?.drops.filter((drop: any) => {
    const lowercaseGenre = drop.genre.toLowerCase();
    return allGenres.some(genre => genre.toLowerCase() === lowercaseGenre);
  });

  const states = data?.map((profile: any) => profile.state);



  return filteredDrops && states && events && (
    <div className="mx-auto p-8 mb-24">
      <EventFeed events={events} />


    </div>
  );
}

export default Page;
