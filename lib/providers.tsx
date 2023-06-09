"use client";
import "@rainbow-me/rainbowkit/styles.css";
import "styles/globals.css";
import * as React from "react";
import { connectorsForWallets, getDefaultWallets } from "@rainbow-me/rainbowkit";
import {
  injectedWallet,
  walletConnectWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, WagmiConfig, createConfig } from "wagmi";
import { mainnet, polygon, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "./supabaseClient";
import { AuthContextProvider } from "app/context";

const ThemeProvider = dynamic(
  async () => {
    const mod = await import("next-themes");
    return mod.ThemeProvider;
  },
);

const projectId = '81347ba0dc58fcf4a2217b6524d9b6c5'
const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_ID as string;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, polygonMumbai],
  [alchemyProvider({ apiKey }), publicProvider()]
);



const { wallets } = getDefaultWallets({
  appName: 'subport',
  projectId,
  chains
})

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "subport recommended",
    wallets: [
      injectedWallet({ chains }),
      rainbowWallet({ projectId, chains }),
      metaMaskWallet({ projectId, chains }),
      coinbaseWallet({ chains, appName: "subport.xyz" }),
      ledgerWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  webSocketPublicClient,
  publicClient,

});



export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContextProvider>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme({
            accentColor: "white",
            accentColorForeground: "black",
            fontStack: "system",
          })}
        >
          <ThemeProvider enableSystem={true} attribute="class" defaultTheme="dark">
            {children}
            <ToastContainer />

          </ThemeProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </AuthContextProvider>
  );
};

export default Providers;

