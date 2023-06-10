'use client'
import React from "react"

import dynamic from 'next/dynamic';

const ThemeProvider = dynamic(
  async () => {
    const mod = await import('next-themes');
    return mod.ThemeProvider;
  },
  { ssr: false, }
);

export const Theme = ({
  children,
}: {
  children: React.ReactNode
}) => {

  return (
    <React.Suspense>
      <ThemeProvider enableSystem={true} attribute="class">

        {children}
      </ThemeProvider>
    </React.Suspense>
  )
}
