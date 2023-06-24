import { allGenres } from "lib/content/allGenres";
import React from "react";
import ByGenre from "ui/Sections/Explore/ByGenre";
import ByLocation from "ui/Sections/Explore/ByLocation";
import Trending from "ui/Sections/Trending";
import { fetchCollectibles } from "utils/database";

async function page() {

  const drops = await fetchCollectibles()

  const filteredDrops = drops?.filter(drop => {
    const lowercaseGenre = drop.genre.toLowerCase();
    return allGenres.some(genre => genre.toLowerCase() === lowercaseGenre);
  });



  console.log(filteredDrops, 'filtered', drops, 'unfiltered')

  return (
    <div className="mx-auto p-8">
      <div className="flex justify-between w-full items-end">
        <h1 className="py-2.5 font-bold text-lg md:text-2xl">Genres</h1>
        <p className="py-2.5 font-bold text-sm">View All</p>
      </div>
      <ByGenre drops={filteredDrops} />
      <br />

      <div className="flex justify-between w-full items-end">
        <h1 className="py-2.5 font-bold text-lg md:text-2xl">Location</h1>
        <p className="py-2.5 font-bold text-sm">View All</p>
      </div>
      <ByLocation />
    </div>
  );
}

export default page;
