'use client'
import React from 'react';
import Slider from 'react-slick';
import Link from 'next/link';

const colors = [
    'bg-red-600',
    'bg-blue-600',
    'bg-green-600',
    'bg-yellow-600',
    'bg-purple-600',
    'bg-pink-600',
];

async function ByGenre({ drops }: any) {
    const uniqueGenres: any[] = drops
        ? [...new Set(drops.map((drop: any) => drop.genre.toLowerCase()))]
        : [];

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: Math.min(4, uniqueGenres.length),
        slidesToScroll: 1,
        touchMove: true,
        swipeToSlide: true,

        arrows: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div>
            <div className="max-w-7xl w-full mx-auto">
                <Slider {...settings} >
                    {uniqueGenres.map((genre: any, index: number) => (
                        <Link href={`/genre/${genre.toLowerCase()}`} key={genre}>
                            <div className={`p-8 hover:contrast-125 rounded-md max-h-56 w-56 aspect-square flex justify-center items-center ${colors[index % colors.length]}`}>
                                <p className="capitalize text-center text-lg font-bold text-white">
                                    {genre}
                                </p>
                            </div>
                        </Link>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default ByGenre;
