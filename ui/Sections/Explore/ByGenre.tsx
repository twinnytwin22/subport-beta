import Link from 'next/link';
import React from 'react';



async function ByGenre({ drops }: any) {
    const uniqueGenres = [...new Set(drops?.map((drop: any) => drop.genre.toLowerCase()))];

    return (
        <div>
            <div className="max-w-7xl w-full flex space-x-3 mx-auto">
                {uniqueGenres.map((genre: any) => (
                    <Link href={`/genre/${genre.toLowerCase()}`} key={genre} className="p-8 bg-blue-700 hover:contrast-125 rounded-md max-h-56 w-56 aspect-square flex justify-center items-center">
                        <p className="capitalize text-center text-lg font-bold">
                            {genre}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ByGenre;
