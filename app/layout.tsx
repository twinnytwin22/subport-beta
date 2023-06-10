import "styles/globals.css";
import Providers from "lib/providers";
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
  return (
    <html suppressHydrationWarning={true}>
      <head />
      <body className="bg-gray-100 dark:bg-black min-w-[315px]">
        <Providers session={session} >
          <div className="mb-16" />
          <div className="flex flex-wrap static">
            <aside className="fixed left-0 hidden sm:block">
              <Suspense>
                <Sidebar session={session} />
              </Suspense>
            </aside>
            <div className="sm:ml-24 lg:ml-56 sm:p-8 w-full mx-auto flex">
              <Suspense>
                <Navbar session={session} />
              </Suspense>
              <div className="max-w-7xl w-full mx-auto">
                <Suspense fallback={null}>
                  {children}
                </Suspense>
              </div>
            </div>
          </div>
          <Suspense fallback={null}>
            <MobileMenu session={session} />
          </Suspense>

        </Providers>

      </body>
    </html>
  );
}
