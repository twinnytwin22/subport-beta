'use client'
import { useAuthProvider } from 'app/context/auth';
import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import SubscriberForm from 'ui/Sections/Create/subscription/SubscriberForm';
import { checkSubscription } from 'utils/database';
import useSubscribeButtonStore from './store';
import { useHandleOutsideClick } from 'lib/hooks/handleOutsideClick';
import { useQuery } from '@tanstack/react-query';

function SubscribeButton({ currentProfile }: any) {
    const { user, profile } = useAuthProvider();
    const profileId = currentProfile?.id;
    const isAuthedUser: boolean = profile?.id === profileId;
    const [isAlreadySubscribed, setIsAlreadySubscribed] = useState(false);
    const [error, setError] = useState<any>(null);
   // const [sub, setSub] = useState<any>(null)
    const { isModalOpen, setIsModalOpen } = useSubscribeButtonStore();
    useHandleOutsideClick(isModalOpen, setIsModalOpen, 'subscribe-modal')

    useEffect(() => {
        if (isModalOpen) {
            // Disable scrolling on the body when the modal is open
            document.body.style.overflow = 'hidden';
        } else {
            // Enable scrolling on the body when the modal is closed
            document.body.style.overflow = 'auto';
        }

        return () => {
            // Reset the body overflow when the component unmounts
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);
   
    const id = profile?.id!!!
    const {data:sub} = useQuery({
        queryKey:['sub', id],
        queryFn: ()=>checkSubscription(id),
        enabled: !!id
    })
    const handleCloseSubscriptionModal = () => {
        setIsModalOpen(false);
        // Add additional logic if needed
    };


    const handleOpenSubscriptionModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return user && sub && (
        <>
            <div className="">
                {!isAuthedUser && (
                    <>
                        {isAlreadySubscribed && (
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white font-bold hover:shadow-md hover:scale-105 shadow text-xs px-4 py-2 rounded-md outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleOpenSubscriptionModal}
                            >
                                {"Subscribed"}
                            </button>
                        )}
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold hover:shadow-md hover:scale-105 shadow text-xs px-2.5 py-2.5 rounded-md outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={handleOpenSubscriptionModal}
                        >
                            {!isAlreadySubscribed && (<FaStar />)}
                        </button>
                    </>
                )}
                {isAuthedUser && (
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white font-bold hover:shadow-md hover:scale-105 shadow text-xs p-2.5 rounded-md outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleOpenSubscriptionModal}
                    >
                        <FaStar />
                    </button>
                )}

                {isModalOpen && (
                    <div className='fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center backdrop-filter backdrop-blur-md'>
                        <div className="w-full max-w-md rounded-md shadow-lg sm:ml-16 lg:ml-64 subscribe-modal">
                            <SubscriberForm sub={sub} close={handleCloseSubscriptionModal} isAuthedUser={isAuthedUser} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default SubscribeButton;
