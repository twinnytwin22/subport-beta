'use client'
import { useAuthProvider } from "app/context/auth";
import React, { useState } from "react";
import Account from "ui/User/Account";

function Page() {
    const { isLoading, user } = useAuthProvider()
    const [activeTab, setActiveTab] = useState('profile')

    return !isLoading && (
        <div className="w-full lg:min-h-[70vh] mt-4 lg:mt-8 flex items-center justify-center content-center mb-24 md:mb-0">
            <div className="flex items-center bg-white dark:bg-black w-full max-w-4xl mx-auto justify-between rounded-md   border-zinc-300 dark:border-zinc-700 border relative">
                <div className="w-48">
                    <ul className="font-bold  text-base lg:text-lg dark:text-zinc-200 text-zinc-900 absolute top-16 left-3 lg:left-8">
                        <li className="cursor-pointer" onClick={() => setActiveTab('profile')}
                        >Profile</li>
                        <li className="cursor-pointer" onClick={() => setActiveTab('preferences')}
                        >Preferences</li>
                        <li className="cursor-pointer" onClick={() => setActiveTab('settings')}
                        >Settings</li>
                    </ul>
                </div>
                <div className="bg-white dark:bg-black  border-zinc-300 dark:border-zinc-800 border-l p-8  max-w-2xl w-full space-y-4 md:flex place-items-start h-full min-h-[500px]">

                    {activeTab === 'profile' && <Account />}
                    {activeTab === 'preferences' && <div className="h-full">Preferences</div>}
                    {activeTab === 'settings' && <div className="h-full">settings</div>}
                </div>

            </div>
        </div>
    )
}
export default Page;
