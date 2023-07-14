"use client";
import "styles/globals.css";
import React from "react";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "app/context/auth";
import { SubportPlayer } from "app/context/subport-player";
import { Suspense } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ThirdwebProvider } from "@thirdweb-dev/react";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
const queryClient = new QueryClient()

const Providers = ({ children, }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);


  if (!mounted) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <Script src="https://sdk.scdn.co/spotify-player.js"></Script>
      <Suspense>
        <AuthContextProvider>
          <SubportPlayer>
            <ThirdwebProvider activeChain="ethereum">
              <Suspense>
                <ThemeProvider attribute="class" defaultTheme="dark">
                  <Suspense>
                    {children}
                  </Suspense>
                </ThemeProvider>
              </Suspense>
              <ToastContainer />
            </ThirdwebProvider>
          </SubportPlayer>
        </AuthContextProvider>
      </Suspense >
    </QueryClientProvider>
  );
};

export default Providers;

