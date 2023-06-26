'use client'
import { useAuthProvider } from "app/context/auth";
import React, { useState } from "react";
import Account from "ui/User/Account";

function page() {
    const { isLoading } = useAuthProvider()
    const [activeTab, setActiveTab] = useState('profile')

    return !isLoading && (
        <div className="w-full min-h-[70vh] flex items-center justify-center content-center mb-24 md:mb-0">
            <div className="flex items-center bg-zinc-950 w-full max-w-4xl mx-auto justify-between rounded-lg   border-slate-300 dark:border-zinc-700 border relative">
                <div className="w-48">
                    <ul className="font-bold text-lg dark:text-zinc-200 text-zinc-900 absolute top-16 left-8">
                        <li onClick={() => setActiveTab('profile')}
                        >Profile</li>
                        <li className="hidden" onClick={() => setActiveTab('preferences')}
                        >Preferences</li>
                        <li className="hidden" onClick={() => setActiveTab('settings')}
                        >Settings</li>
                    </ul>
                </div>
                <div className="bg-slate-200 dark:bg-zinc-950  border-slate-300 dark:border-zinc-700 border-l rounded-lg p-8 mx-4 max-w-2xl w-full space-y-4 md:flex place-items-center h-full min-h-[400px]">

                    {activeTab === 'profile' && <Account />}
                    {activeTab === 'preferences' && <div className="h-full">Preferences</div>}
                    {activeTab === 'settings' && 'settings'}
                </div>

            </div>
        </div>
    )
}
export default page;
