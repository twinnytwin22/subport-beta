import { allGenres } from 'lib/content/allGenres';
import { notFound } from 'next/navigation';
import React from 'react';
import Trending from 'ui/Sections/Trending';

export const revalidate = 60 // revalidate this segment every hour
export default async function Page({ params }: { params: { genre: string } }) {
    const { genre } = params;


    try {
        if (!genre) {
            notFound()
        }



        return (
            <div className='mx-auto w-full'>
                <Trending />
            </div>
        );
    } catch (error) {
        console.error('An error occurred:', error);
        notFound()
    }
}


export async function generateStaticParams() {

    return allGenres.map((genre) => ({
        genre: genre,
    }))
}