import { allGenres } from 'lib/content/allGenres';
import { notFound } from 'next/navigation';
import React from 'react';
import Trending from 'ui/Sections/Trending';
export const revalidate = 60// revalidate this page every 60 seconds

export const dynamic = 'force-dynamic'
export default async function Page({ params }: { params: { genre: string } }) {
    const { genre } = params;
    const validGenre = allGenres.some(
        (existingGenre) => existingGenre.toLowerCase() === genre.toLowerCase()
    );

    if (validGenre) {
        return (
            <div className='mx-auto w-full'>
                <Trending />
            </div>
        );
    } else {
        notFound();
    }
}


