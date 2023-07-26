import Link from 'next/link';
import React from 'react';

const createSubport = {
    campaigns: {
        title: 'Get Started',
        options: [{ name: 'IRL Event', href: '/create/event', description: 'Promote an upcoming event. Collect RSVPs, sell tickets, add perks. ' },
        { name: 'Collectible', href: '/create/collectible', description: 'Reward your community digital collectibles for supporting your drop. ' },
        { name: 'Subscription', href: '/create/subscription', description: 'Monthly subscription for your community to subport on-going!' },
            //   { name: 'Option 3', href: '#' },
        ],
    },
    //  merchandise: {
    //   title: 'Merchandise',
    //   options: [
    //     { name: 'Option 1', href: '#' },
    //     { name: 'Option 2', href: '#' },
    //     { name: 'Option 3', href: '#' },
    //   ],
    //  },
};

function CreateHeader() {
    return (
        <div className='bg-zinc-100 dark:bg-black w-full max-w-7xl mx-auto place-items-center items-center '>

            <div className='max-w-4xl mx-auto w-full mt-10 justify-center'>
                <h2 className="text-2xl font-bold text-center ">Get Started</h2>
                <p className='max-w-lg  mb-4 mx-auto text-center font-normal text-zinc-700 dark:text-zinc-400'>Unleash your creativity! Organize events, run campaigns, design merchandise. Explore and create something extraordinary!</p>

                {Object.entries(createSubport).map(([category, { title, options }], i) => (
                    <div key={i} className='mx-auto w-fit place-content-center max-w-4xl relative block px-2.5'>
                        <div className='grid grid-cols-1 md:grid-cols-3 place-items-center gap-4 mb-10  mx-auto '>
                            {options.map((option, j) => (
                                <CreateOptionCard key={j} option={option} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function CreateOptionCard({ option }: any) {
    return (
        <Link href={option.href} passHref>
            <div className="w-full max-w-md lg:max-w-[250px] p-6 bg-white border border-zinc-200 rounded-lg shadow dark:bg-zinc-900 dark:border-zinc-700 hover:ring-2 hover:ring-blue-500 focus:ring-2 focus:ring-green-700 focus:outline-none">
                <h5 className="mb-2 text-lg font-bold tracking-tight text-zinc-900 dark:text-white select-none">{option.name}</h5>
                <p className="mb-3 font-normal text-zinc-700 dark:text-zinc-400 text-sm select-none">{option.description}</p>
            </div>
        </Link>

    );
}

export default CreateHeader;
