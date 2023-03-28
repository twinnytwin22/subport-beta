import 'server-only'
import { Theme } from "styles/Theme";
import "styles/globals.css";
import Providers from "lib/providers";
import Navbar from "ui/Navigation/Navbar";
import { createServerClient } from "lib/supabase-server";
import MobileMenu from 'ui/Navigation/MobileMenu';

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <html>
      <head />
      <body className="bg-gray-100 dark:bg-black min-w-[315px]">
          <Providers>
            <Theme>
              <Navbar />
              <div className='mb-16'/>
              {children}
              <MobileMenu/>
            </Theme>
          </Providers>
      </body>
    </html>
  );
}
