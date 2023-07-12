'use client'
import Link from 'next/link';
import React from 'react';

const createSubport = {
  //  events: {
  //    title: 'Events',
  //    options: [
  //      { name: 'Option 1', href: '#' },
  //      { name: 'Option 2', href: '#' },
  ///      { name: 'Option 3', href: '#' },
  //    ],
  //  },
  campaigns: {
    title: 'Campaigns',
    options: [
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

function Create() {
  return (
    <div className='bg-zinc-100 dark:bg-black w-full max-w-screen mx-auto place-items-center items-center min-h-screen mb-24'>
      <p className='mt-8 max-w-lg mx-auto text-center font-normal text-zinc-700 dark:text-zinc-400'>Unleash your creativity! Organize events, run campaigns, design merchandise. Explore and create something extraordinary!</p>
      <div className='max-w-6xl mx-auto w-full mt-8 justify-center'>
        {Object.entries(createSubport).map(([category, { title, options }], i) => (
          <div key={i} className='mx-auto w-full place-content-center'>
            <h2 className="text-2xl font-bold mb-2.5">{title}</h2>
            <div className='flex place-items-center gap-4 mb-10 flex-wrap mx-auto'>
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
      <div className="max-w-[250px] p-6 bg-white border border-zinc-200 rounded-lg shadow dark:bg-zinc-900 dark:border-zinc-700 hover:ring-2 hover:ring-blue-500 focus:ring-2 focus:ring-green-700 focus:outline-none">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white select-none">{option.name}</h5>
        <p className="mb-3 font-normal text-zinc-700 dark:text-zinc-400 text-sm select-none">{option.description}</p>
      </div>
    </Link>

  );
}

export default Create;
