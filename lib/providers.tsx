"use client";
import "@rainbow-me/rainbowkit/styles.css";
import "styles/globals.css";
import * as React from "react";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  injectedWallet,
  walletConnectWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, WagmiConfig, createClient } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  SessionProvider as AuthProvider,
  SessionProvider,
} from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { getAuthOptions } from "pages/api/auth/[...nextauth]";
import { useAccount } from "wagmi";
import { supabase } from "./supabaseClient";

const ThemeProvider = dynamic(
  () => {
    return import("next-themes").then((mod) => mod.ThemeProvider);
  },
  { ssr: false }
);

const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_ID as string;
const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, polygon],
  [alchemyProvider({ apiKey }), publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: "subport recommended",
    wallets: [
      injectedWallet({ chains }),
      rainbowWallet({ chains }),
      metaMaskWallet({ chains }),
      coinbaseWallet({ chains, appName: "subport.xyz" }),
      ledgerWallet({ chains }),
      walletConnectWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export const Providers = ({ children }: { children: React.ReactNode }, user: any) => {
  return (
    <AuthProvider>
      <WagmiConfig client={wagmiClient}>
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
  const { address } = useAccount();
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
