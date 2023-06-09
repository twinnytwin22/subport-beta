import "server-only";
import { Theme } from "styles/Theme";
import "styles/globals.css";
import Providers from "lib/providers";
import Navbar from "ui/Navigation/Navbar";
import MobileMenu from "ui/Navigation/MobileMenu";
import Sidebar from "ui/Navigation/Sidebar";
import { Suspense } from "react";

export const revalidate = 0;
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html suppressHydrationWarning>
      <head />
      <body className="bg-gray-100 dark:bg-black min-w-[315px]">
        <Providers >
          <Theme>
            <Suspense fallback='loading...'>
              <div className="mb-16" />
              <div className="flex flex-wrap static">
                <aside className="fixed left-0 hidden sm:block">
                  <Sidebar />
                </aside>
                <div className="sm:ml-24 lg:ml-56 sm:p-8 w-full mx-auto flex">
                  <Navbar />
                  <div className="max-w-7xl w-full mx-auto">{children}</div>
                </div>
              </div>
              <MobileMenu />
            </Suspense>
          </Theme>
        </Providers>
      </body>
    </html>
  );
}
