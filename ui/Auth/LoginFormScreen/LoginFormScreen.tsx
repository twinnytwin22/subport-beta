import { SupbortLogo } from 'lib/content/siteSettings';
import React from 'react'
import LoginCard from '../AuthComponent/LoginCard';
import Link from 'next/link';

function LoginFormScreen() {
  return (
<section className="gradient-form h-full bg-zinc-100 dark:bg-black mx-auto">
      <div className="container h-full p-10 mx-auto">
        <div className="g-6 flex h-full flex-wrap items-center mx-auto justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full mx-auto">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 max-w-6xl mx-auto">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* Left column container */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* Logo */}
                    <div className="text-center pt-8">
                      <img
                        className="mx-auto w-20"
                        src={SupbortLogo}
                        alt="logo"
                      />
                   
                    </div>
                    <LoginCard isHomePage={true}/>
                    
                  </div>
                </div>

                {/* Right column container with background and description */}
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none  bg-gradient-to-r from-blue-600 to-blue-900 "
               
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h1 className="mb-6 text-3xl md:text-5xl font-bold">
                    Experience new music daily.
                    </h1>
                    <p className="text-lg">
                    Enabling the discovery of independent artists by providing them the tools to connect directly with their listeners.


                    </p>
                  </div>
                </div>
              </div>
            </div>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-zinc-500 sm:mb-0 dark:text-zinc-400 mx-auto max-w-6xl py-2">
                <li>
                    <Link href="https://subport.xyz/privacy-policy" className="mr-4 hover:underline md:mr-6">Cookie & Privacy Policy</Link>
                </li>
                <li>
                    <Link href="https://subport.xyz/terms" className="mr-4 hover:underline md:mr-6 ">Terms</Link>
                </li>
               
                </ul>
          </div>
        </div>
      </div>
    </section>
  );
}  

export default LoginFormScreen