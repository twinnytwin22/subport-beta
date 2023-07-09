"use client";
import "styles/globals.css";
import * as React from "react";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "app/context/auth";
import { SubportPlayer } from "app/context/subport-player";
import { Suspense } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

const ThemeProvider = dynamic(
  async () => {
    const mod = await import("next-themes");
    return mod.ThemeProvider;
  },
);

export const Providers = ({ children, }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <SubportPlayer>
          <Suspense>
            <ThemeProvider enableSystem={true} attribute="class" defaultTheme="dark">
              {children}
              <ToastContainer />
            </ThemeProvider>
          </Suspense>
        </SubportPlayer>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default Providers;

