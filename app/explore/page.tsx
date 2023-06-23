import { allGenres } from "lib/content/allGenres";
import React from "react";
import ByGenre from "ui/Sections/Explore/ByGenre";
import Trending from "ui/Sections/Trending";
import { fetchCollectibles } from "utils/database";

async function page() {

  const drops = await fetchCollectibles()

  const filteredByGenre = drops?.filter(drop => {
    const lowercaseGenre = drop.genre.toLowerCase();
    return allGenres.some(genre => genre.toLowerCase() === lowercaseGenre);
  });

  console.log(filteredByGenre, 'filtered', drops, 'unfiltered')

  return (
    <div className="mx-auto p-8">
      <ByGenre drops={filteredByGenre} />
    </div>
  );
}

export default page;
