import { allGenres } from "lib/content/allGenres";
import React, { Suspense } from "react";
import { getProfilesWithDrops } from "utils/database";
import { headers } from "next/headers";
import EventFeed from "ui/Sections/Explore/Events"
import { fetchAllCollectibles, fetchAllEvents } from "utils/use-server";
export const dynamic = 'force-dynamic'
export const revalidate = 5

async function Page() {
  const [drops, events, data] = await Promise.all([
    fetchAllCollectibles(),
    fetchAllEvents(),
    getProfilesWithDrops()
])  


  const filteredDrops = drops?.drops.filter((drop: any) => {
    const lowercaseGenre = drop.genre.toLowerCase();
    return allGenres.some(genre => genre.toLowerCase() === lowercaseGenre);
  });

  const states = data?.map((profile: any) => profile.state);
  const cities = data?.map((profile) => profile.city)



  return filteredDrops && events && (
    <div className="mx-auto py-8 md:p-8 mb-24">
    <EventFeed events={events} />


    </div>
  );
}

export default Page;
