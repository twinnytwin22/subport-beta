"use client";
import "styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
import { Ethereum, Polygon, Optimism } from "@thirdweb-dev/chains";
import { IpfsUploader, StorageDownloader, ThirdwebStorage } from "@thirdweb-dev/storage";

const queryClient = new QueryClient()
const gatewayUrls = [
  "https://subport.infura-ipfs.io/ipfs/",
  "https://ipfs.thirdwebcdn.com/ipfs/",
  "https://gateway.ipfscdn.io/ipfs/",
  "https://cloudflare-ipfs.com/ipfs/",
  "https://ipfs.io/ipfs/",
]

const downloader = new StorageDownloader();
const uploader = new IpfsUploader();
const storage = new ThirdwebStorage({ uploader, downloader, gatewayUrls });

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
            <ThirdwebProvider activeChain={Polygon} supportedChains={[Ethereum, Polygon, Optimism]}>
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

