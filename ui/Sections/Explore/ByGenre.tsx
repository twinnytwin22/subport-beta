import Link from 'next/link';
import React from 'react';

const colors = [
    "bg-red-600",
    "bg-blue-600",
    "bg-green-600",
    "bg-yellow-600",
    "bg-purple-600",
    "bg-pink-600",
];

async function ByGenre({ drops }: any) {
    const uniqueGenres: any[] = drops ? [...new Set(drops.map((drop: any) => drop.genre.toLowerCase()))] : [];

    return (
        <div>
            <div className="max-w-7xl w-full flex space-x-3 mx-auto">
                {uniqueGenres.map((genre: any, index: number) => (
                    <Link href={`/genre/${genre.toLowerCase()}`} key={genre} className={`p-8 hover:contrast-125 rounded-md max-h-56 w-56 aspect-square flex justify-center items-center ${colors[index % colors.length]}`}>
                        <p className="capitalize text-center text-lg font-bold text-white">
                            {genre}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ByGenre;
