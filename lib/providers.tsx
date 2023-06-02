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
import { mainnet, polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  SessionProvider as AuthProvider,
} from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { getAuthOptions } from "pages/api/auth/[...nextauth]";
import { supabase } from "./supabaseClient";

const ThemeProvider = dynamic(
  () => {
    return import("next-themes").then((mod) => mod.ThemeProvider);
  },
  { ssr: false }
);

const projectId = '81347ba0dc58fcf4a2217b6524d9b6c5'

const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_ID as string;
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon],
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

export const Providers = ({ children }: { children: React.ReactNode }, user: any) => {
  return (
    <AuthProvider>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme({
            accentColor: "white",
            accentColorForeground: "black",
            fontStack: "system",
          })}
        >
          <ThemeProvider enableSystem={true} attribute="class">
            {children}
          </ThemeProvider>
          <ToastContainer />
        </RainbowKitProvider>
      </WagmiConfig>
    </AuthProvider>
  );
};

export default Providers;

export async function getServerSideProps(context: any) {
  const session = await getServerSession(
    getAuthOptions()
  );
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    let { data } = await supabase
      .from("users")
      .select()
      .eq("id", session?.user.id);
    console.log(data, 'booty')
    // Call the checkWalletAddress function and pass the session object
    return {
      props: {
        session,
        user: data,
      },
    };
  }
}
