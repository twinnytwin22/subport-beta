import React from 'react';
import Link from 'next/link';

const colors = [
    "bg-yellow-600",
    "bg-purple-600",
    "bg-pink-600",
    "bg-red-600",
    "bg-blue-600",
    "bg-green-600",

];
async function ByLocation({ states }: any) {

    return (
        <div>
            <div className="max-w-7xl w-full mx-auto">
                <div className='flex overflow-x-scroll space-x-4' >

                    {states.map((state: string, index: any) => (
                        <Link href={`/location/${state.toLowerCase()}`} key={state} className={`p-8 hover:contrast-125 rounded-md max-h-56 w-56 aspect-square flex justify-center items-center ${colors[index % colors.length]}
                        }`}>
                            <p className="capitalize text-center text-xl font-bold text-white">
                                {state}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ByLocation;
