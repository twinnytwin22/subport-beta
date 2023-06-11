import Providers from "lib/providers/providers";
import Navbar from "ui/Navigation/Navbar";
import MobileMenu from "ui/Navigation/MobileMenu";
import Sidebar from "ui/Navigation/Sidebar";
import { Suspense } from "react";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session }
  } = await supabase.auth.getSession();

  const ContentWrapper = () => (
    <div className="z-0 top-16 left-0 right-0  sm:ml-[124px] lg:ml-[248px] border-zinc-200 dark:border-zinc-800 px-6 py-2.5 w-full bg-zinc-100 dark:bg-black mx-auto max-w-screen container overflow-x-hidden">
      {children}
    </div>
  );

  return (
    <html suppressHydrationWarning={true}>
      <head />
      <body className="bg-gray-100 dark:bg-black min-w-sm max-w-screen w-full relative">
        <Providers session={session}>
          <div className="mb-16" />
          <div className="flex flex-wrap relative flex-col mx-auto top-0 right-0 left-0 overflow-hidden w-full">
            <Sidebar session={session} />
            <div className="w-full mx-auto flex justify-center relative right-0 isolate inset-1">
              <Navbar session={session} />
              <ContentWrapper />
            </div>
          </div>
          <MobileMenu session={session} />
        </Providers>
      </body>
    </html>
  );
}
