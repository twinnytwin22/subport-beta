'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Ethereum, Optimism, Polygon } from '@thirdweb-dev/chains';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { AuthContextProvider } from 'app/context/auth';
import { GlobalUI } from 'app/context/global-ui';
import { SubportPlayer } from 'app/context/subport-player';
import { ThemeProvider } from 'next-themes';
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/globals.css';
import { clientId, secretKey, storage } from './thirdweb/thirdweb';
const GoogleMapWrap = dynamic(() => import('./google/maps'), {ssr: false})
const ToastContainer = dynamic(
  () => import('react-toastify').then((module) => module.ToastContainer),
  {
    ssr: false
  }
);
const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  // const [mounted, setMounted] = React.useState(false);
  // React.useEffect(() => setMounted(true), []);

  // if (!mounted) return null;
  // <Script src="https://sdk.scdn.co/spotify-player.js"></Script>

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        {/* <Suspense> */}
          <SubportPlayer>
            {/* <Suspense> */}
              <ThirdwebProvider
                secretKey={secretKey!}
                clientId={clientId!}
                storageInterface={storage}
                activeChain={Polygon}
              //  queryClient={queryClient}
                supportedChains={[Ethereum, Polygon, Optimism]}
               // queryClient={queryClient}
                // sdkOptions={{
                //   alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID
                // }}
              >
                <Suspense>
                  <ThemeProvider attribute="class" defaultTheme="dark">
                      <GoogleMapWrap>
                        <GlobalUI>
                          {children}
                          <ToastContainer theme="dark" />
                        </GlobalUI>
                      </GoogleMapWrap>
                  </ThemeProvider>
                </Suspense>
              </ThirdwebProvider>
            {/* </Suspense> */}
          </SubportPlayer>
        {/* </Suspense> */}
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default Providers;
