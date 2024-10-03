import Providers from 'lib/providers/providers';
import { createClient } from 'lib/providers/supabase/supabase-server';
import React, { Suspense } from 'react';
import { LoadingContainer } from 'ui/LoadingContainer';
import MobileMenu from 'ui/Navigation/MobileMenu';
import Navbar from 'ui/Navigation/Navbar/Navbar';
import Sidebar from 'ui/Navigation/Sidebar';
import FooterPlayer from 'ui/Players/FooterPlayer';
import NewUserModal from 'ui/User/NewUserModal';

export const preferredRegion = 'auto';
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: session } = await supabase.auth.getSession();
  console.log(session)


  const ContentWrapper = () => (
    <div
      className={`z-0 top-16 left-0 right-0 ${session.session ? 'sm:ml-[128px] lg:ml-[256px]' : ''
        } border-zinc-200 dark:border-zinc-800 px-3 md:px-6 py-2.5 w-full bg-zinc-100 dark:bg-black mx-auto   container overflow-x-hidden overflow-y-visible place-content-center place-items-center flex`}
    >
      <NewUserModal />
      <div className="relative mx-auto max-w-7xl w-full">{children}</div>
      <FooterPlayer />
    </div>
  );

  return (
    <html suppressHydrationWarning={true}>
      <body className="bg-gray-100 dark:bg-black min-w-full max-w-screen w-full relative">
        <Providers>
          {session.session ? (
            <>
              <div className="mb-0" />
              <div className="flex flex-wrap relative flex-col mx-auto top-0 right-0 left-0 overflow-hidden w-full">
                <Sidebar />
                <div className="w-full mx-auto flex justify-center relative right-0 isolate inset-1 overflow-hidden">
                  <Navbar />
                  <Suspense fallback={<LoadingContainer />}>
                    <ContentWrapper />
                  </Suspense>
                </div>
              </div>
              <MobileMenu />{' '}
            </>
          ) : (
            <ContentWrapper />
          )}
        </Providers>
      </body>
    </html>
  );
}
