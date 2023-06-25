import React from 'react';
import { getProfilesWithDrops } from 'utils/database';
import Link from 'next/link';

const colors = [
    "bg-red-600",
    "bg-blue-600",
    "bg-green-600",
    "bg-yellow-600",
    "bg-purple-600",
    "bg-pink-600",
];

async function ByLocation({ artists }: any) {
    const data = await getProfilesWithDrops();
    const states = [...new Set(data?.map((profile: any) => profile.state))];

    return (
        <div>
            <div className="max-w-7xl w-full flex space-x-3 mx-auto">
                {states.map((state: string, index: number) => (
                    <Link href={`/location/${state.toLowerCase()}`} key={state} className={`p-8 hover:contrast-125 rounded-md max-h-56 w-56 aspect-square flex justify-center items-center ${colors[Math.floor(Math.random() * colors.length)]
                        }`}>
                        <p className="capitalize text-center text-xl font-bold text-white">
                            {state}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ByLocation;
