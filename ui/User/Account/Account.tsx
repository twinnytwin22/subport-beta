'use client'
import { useAuthProvider } from "app/context/auth";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Account from "ui/User/Account/Account";
import ArtistSettings from "ui/User/Account/ArtistSettings/ArtistSettings";
import ProfileSettings from "ui/User/Account/ProfileSettings/ProfileSettings";
import Preferences from "./Preferences";

function SettingsPage() {
    const { isLoading, user } = useAuthProvider()
    const [activeTab, setActiveTab] = useState<string | null>('profile')
    const params = useParams()
    //console.log(params)

    return !isLoading && (
        <div className="w-full min-h-[70vh] max-h-[80vh] mt-4 lg:mt-8 flex justify-center content-center mb-24 md:mb-0">
            <div className={`flex min-h-full max-h-[70vh] md:overflow-y-hidden items-center bg-white dark:bg-black w-full max-w-4xl mx-auto justify-between rounded-md border-zinc-300 dark:border-zinc-700 md:border relative`}>
                <div className={`${activeTab !== null ? 'hidden md:block w-48' : 'block max-w-sm w-full mx-auto md:w-48 h-96'}`} >
                    {/* SETTINGS MENU */}
                    <ul className="font-bold text-2xl md:text-base lg:text-lg dark:text-zinc-200 text-zinc-900 absolute top-16 left-3 xl:left-8 h-full ">
                        <li
                            className={`cursor-pointer ${activeTab === 'profile' && 'text-blue-500'}`}
                            onClick={() => setActiveTab('profile')}
                        >Profile
                        </li>
                        <li
                            className={`cursor-pointer ${activeTab === 'artist-settings' && 'text-blue-500'}`}
                            onClick={() => setActiveTab('artist-settings')}
                        >Artist Settings
                        </li>
                        <li
                            className={`cursor-pointer ${activeTab === 'preferences' && 'text-blue-500'}`}
                            onClick={() => setActiveTab('preferences')}
                        >Preferences
                        </li>
                        <li
                            className={`cursor-pointer ${activeTab === 'settings' && 'text-blue-500'}`}
                            onClick={() => setActiveTab('settings')}
                        >Settings
                        </li>
                    </ul>
                </div>
                <div className={`bg-white dark:bg-black relative  border-zinc-300 dark:border-zinc-800 md:border-l p-8  max-w-2xl w-full space-y-4 md:flex place-items-start h-full  overflow-y-scroll overflow-x-hidden ${activeTab !== null ? 'block' : 'hidden'}`}>
                    {/* SETTINGS CONTENT */}
                    <button className={`${activeTab !== null ? 'block md:hidden' : 'hidden'}`}
                        onClick={() => setActiveTab(null)}><FaArrowLeft />
                    </button>
                    {activeTab === 'profile' && <ProfileSettings />}
                    {activeTab === 'preferences' && <div className="h-full"><Preferences/></div>}
                    {activeTab === 'artist-settings' && <ArtistSettings />}
                    {activeTab === 'settings' && <div className="h-full">settings</div>}
                </div>
                
            </div>
        </div>
    )
}


export function SettingsPageSmall() {
  const { isLoading, user } = useAuthProvider()
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const params = useParams()
  //console.log(params)

  return !isLoading && (
      <div className="w-full min-h-[70vh] max-h-[80vh] mt-4 lg:mt-8 flex justify-center content-center mb-24 md:mb-0">
          <div className={`flex min-h-full max-h-[70vh] md:overflow-y-hidden items-center bg-white dark:bg-black w-full max-w-4xl mx-auto justify-between rounded-md border-zinc-300 dark:border-zinc-700 md:border relative`}>
              <div className={`${activeTab !== null ? 'hidden md:block w-48' : 'block max-w-sm w-full mx-auto md:w-48 h-96'}`} >
                  {/* SETTINGS MENU */}
                  <ul className="font-bold text-2xl md:text-base lg:text-lg dark:text-zinc-200 text-zinc-900 absolute left-3 xl:left-8 h-full ">
                      <li
                          className={`cursor-pointer ${activeTab === 'profile' && 'text-blue-500'}`}
                          onClick={() => setActiveTab('profile')}
                      >Profile
                      </li>
                      <li
                          className={`cursor-pointer ${activeTab === 'artist-settings' && 'text-blue-500'}`}
                          onClick={() => setActiveTab('artist-settings')}
                      >Artist Settings
                      </li>
                      <li
                          className={`cursor-pointer ${activeTab === 'preferences' && 'text-blue-500'}`}
                          onClick={() => setActiveTab('preferences')}
                      >Preferences
                      </li>
                      <li
                          className={`cursor-pointer ${activeTab === 'settings' && 'text-blue-500'}`}
                          onClick={() => setActiveTab('settings')}
                      >Settings
                      </li>
                  </ul>
              </div>
              <div className={`bg-white dark:bg-black relative  border-zinc-300 dark:border-zinc-800 md:border-l p-8  max-w-2xl w-full space-y-4 md:flex place-items-start h-full  overflow-y-scroll overflow-x-hidden ${activeTab !== null ? 'block' : 'hidden'}`}>
                  {/* SETTINGS CONTENT */}
                  <button className={`${activeTab !== null ? 'block md:hidden' : 'hidden'}`}
                      onClick={() => setActiveTab(null)}><FaArrowLeft />
                  </button>
                  {activeTab === 'profile' && <ProfileSettings />}
                  {activeTab === 'preferences' && <div className="h-full">Preferences</div>}
                  {activeTab === 'artist-settings' && <ArtistSettings />}
                  {activeTab === 'settings' && <div className="h-full">settings</div>}
              </div>
              
          </div>
      </div>
  )
}
export default SettingsPage;
