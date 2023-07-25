import { allGenres } from "lib/content/allGenres";
import React, { Suspense } from "react";
import ByGenre from "ui/Sections/Explore/ByGenre";
import ByLocation from "ui/Sections/Explore/ByLocation";
import { getProfilesWithDrops } from "utils/database";
import { headers } from "next/headers";
export const revalidate = 60// revalidate this page every 60 seconds


async function Page() {
  const host = headers().get('host')
  const protocol = process?.env.NODE_ENV === "development" ? "http" : "https"
  const res = await fetch(`${protocol}://${host}/api/v1/getCollectibles`, {
    method: "GET",
    /// headers: { "Content-Type": "application/json" },
    cache: 'no-store',
  });
  const drops = await res.json()

  const data = await getProfilesWithDrops();

  const filteredDrops = drops?.drops.filter((drop: any) => {
    const lowercaseGenre = drop.genre.toLowerCase();
    return allGenres.some(genre => genre.toLowerCase() === lowercaseGenre);
  });

  const states = data?.map((profile: any) => profile.state);



  return filteredDrops && states && (
    <div className="mx-auto p-8">
      <div className="flex justify-between w-full items-end">
        <h1 className="py-2.5 font-bold text-lg md:text-2xl">Genres</h1>
        <p className="py-2.5 font-bold text-sm">View All</p>
      </div>
      <Suspense>
        <ByGenre drops={filteredDrops} />
      </Suspense>
      <br />

      <div className="flex justify-between w-full items-end">
        <h1 className="py-2.5 font-bold text-lg md:text-2xl">Locations</h1>
        <p className="py-2.5 font-bold text-sm">View All</p>
      </div>
      <Suspense>
        <ByLocation states={states} />
      </Suspense>
    </div>
  );
}

export default Page;
