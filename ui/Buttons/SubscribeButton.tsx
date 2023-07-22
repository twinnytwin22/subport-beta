'use client'
import { useAuthProvider } from 'app/context/auth';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import SubscriberForm from 'ui/Sections/Create/subscription/SubscriberForm';

function SubscribeButton({ currentProfile, sub }: any) {
    const { user, profile } = useAuthProvider();
    const profileId = currentProfile?.id;
    const isAuthedUser: boolean = profile?.id === profileId;
    const [isAlreadySubscribed, setIsAlreadySubscribed] = useState(false);
    const [error, setError] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility


    const handleOpenSubscriptionModal = () => {
        if (!isModalOpen) {
            setIsModalOpen(true)
            return
        } else {
            setIsModalOpen(false)
            return
        }
    };


    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return user && sub && (
        <div className="">
            {!isAuthedUser && (
                <>  {isAlreadySubscribed &&
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white font-bold hover:shadow-md hover:scale-105 shadow text-xs px-4 py-2 rounded-lg outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleOpenSubscriptionModal}
                    >
                        {"Subscribed"}
                    </button>}
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold hover:shadow-md hover:scale-105 shadow text-xs px-2.5 py-2.5 rounded-lg outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleOpenSubscriptionModal}
                    >
                        {!isAlreadySubscribed && (<FaStar />)}
                    </button>
                </>
            )}
            {isAuthedUser && (
                <button
                    className="bg-green-600 hover:bg-green-700 text-white font-bold hover:shadow-md hover:scale-105 shadow text-xs p-2.5 rounded-lg outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleOpenSubscriptionModal}
                >
                    <FaStar />
                </button>
            )}

            {/* Modal */}
            {isModalOpen && (
                <SubscriberForm sub={sub} close={handleOpenSubscriptionModal} isAuthedUser={isAuthedUser} />
            )}
        </div>
    );
}

export default SubscribeButton;
