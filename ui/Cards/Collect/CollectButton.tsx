'use client'
import Link from 'next/link';
import React, { useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import DropLinksTo from 'ui/Sections/Drop/DropLInks';

function CollectButton({ props, drop }: any) {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleOpenCollectMenu = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const targetElement = event.target as Element;
            const isLinkOrChild = targetElement.closest('a');

            if (!isLinkOrChild && !targetElement.closest('.collect-button')) {
                setIsOpen(false);
                return;
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClick);
        } else {
            document.removeEventListener('mousedown', handleClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [isOpen]);

    return (
        <>
            <div
                onClick={handleOpenCollectMenu}
                id='collect-button'
                className="collect-button inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Collect
            </div>
            {isOpen && (
                <div className='absolute bottom-24 right-4 border border-zinc-200 dark:border-zinc-800 bg-white  dark:bg-zinc-900 w-fit mx-auto justify-center p-4 rounded-2xl items-center flex shadow-2xl '>
                    <div>
                        <Link href={`/drop/${drop.slug}`}>
                            <div
                                className="text-white text-center w-full  focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-zinc-950 hover:bg-zinc-500 focus:outline-none "
                            >
                                <div className='flex space-x-2 mx-auto text-center items-center justify-center w-full'>Go to drop
                                    <FaArrowRight /></div>
                            </div>
                        </Link>

                        <DropLinksTo />
                        <button
                            className="text-zinc-900 dark:text-white text-center w-full border-2 dark:border-zinc-800 border-zinc-300 focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-zinc-950 dark:hover:bg-zinc-700 focus:outline-none "
                            onClick={handleClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default CollectButton;
