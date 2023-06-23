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
      { name: 'Collectible', href: '/create/collectible' },
      //   { name: 'Option 2', href: '#' },
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
      <div className='max-w-7xl mx-auto w-full mt-8'>
        {Object.entries(createSubport).map(([category, { title, options }], i) => (
          <div key={i} className='mx-auto'>
            <h2 className="text-2xl font-bold mb-2.5">{title}</h2>
            <div className='grid grid-flow-col auto-cols-max place-items-center gap-4 mb-10'>
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
    <div className="max-w-[250px] p-6 bg-white border border-zinc-200 rounded-lg shadow dark:bg-zinc-900 dark:border-zinc-700">
      <Link href={option.href}>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{option.name}</h5>
      </Link>
      <p className="mb-3 font-normal text-zinc-700 dark:text-zinc-400">Here is some description about the option.</p>
      <Link href={option.href} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Get Started
        <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
        </svg>
      </Link>
    </div>
  );
}

export default Create;
