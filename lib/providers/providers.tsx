"use client";
import "styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import { AuthContextProvider } from "app/context/auth";
import { SubportPlayer } from "app/context/subport-player";
import { Suspense } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ThemeProvider } from "next-themes";
import { Ethereum, Polygon, Optimism } from "@thirdweb-dev/chains";
import GoogleMapWrap from "./google/maps";
import { GlobalUI } from "app/context/global-ui";
import { storage, clientId, secretKey } from "./thirdweb/thirdweb";
import dynamic from 'next/dynamic';

const ToastContainer = dynamic(() => import('react-toastify').then((module) => module.ToastContainer), {
  ssr: false,
});
const queryClient = new QueryClient()



const Providers = ({ children, }: { children: React.ReactNode }) => {
  // const [mounted, setMounted] = React.useState(false);
  // React.useEffect(() => setMounted(true), []);


  // if (!mounted) return null;
  // <Script src="https://sdk.scdn.co/spotify-player.js"></Script> 

  return (
    <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Suspense>
            <SubportPlayer>
              <Suspense>
              <ThirdwebProvider
                secretKey={secretKey!}
                clientId={clientId!}
                storageInterface={storage}
                activeChain={Polygon}
                supportedChains={[Ethereum, Polygon, Optimism]}
                queryClient={queryClient}
                sdkOptions={{
                  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID
                }}>
                <Suspense>
                  <ThemeProvider attribute="class" defaultTheme="dark">
                    <Suspense>
                      <GoogleMapWrap>
                        <GlobalUI>
                          {children}
        <ToastContainer theme="dark" />

                        </GlobalUI>
                      </GoogleMapWrap>
                    </Suspense>
                  </ThemeProvider>
                </Suspense>
              </ThirdwebProvider>
              </Suspense>
            </SubportPlayer>
          </Suspense>
        </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default Providers;

