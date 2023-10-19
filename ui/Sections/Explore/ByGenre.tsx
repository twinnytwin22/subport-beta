'use client';
import Link from 'next/link';

const colors = [
  'bg-red-600',
  'bg-blue-600',
  'bg-green-600',
  'bg-yellow-600',
  'bg-purple-600',
  'bg-pink-600'
];

function ByGenre({ drops }: any) {
  const uniqueGenres: any[] = drops
    ? [...new Set(drops.map((drop: any) => drop.genre.toLowerCase()))]
    : [];

  return (
    <div>
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex overflow-x-scroll space-x-4">
          {uniqueGenres.map((genre: any, index: number) => (
            <Link href={`/genre/${genre.toLowerCase()}`} key={genre}>
              <div
                className={`p-8 hover:contrast-125 rounded-md max-h-56 w-56 aspect-square flex justify-center items-center ${
                  colors[index % colors.length]
                }`}
              >
                <p className="capitalize text-center text-lg font-bold text-white">
                  {genre}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ByGenre;
