import 'server-only'
import { Theme } from "styles/Theme";
import "styles/globals.css";
import Providers from "lib/providers";
import Navbar from "ui/Navigation/Navbar";

import SupabaseProvider from "lib/supabase-provider";
import SupabaseListener from "lib/supabase-listener";
import { createServerClient } from "utils/supabase-server";

import type { Database } from "types/supabase";
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import MobileMenu from 'ui/Navigation/MobileMenu';

export type TypedSupabaseClient = SupabaseClient<Database>;

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
              {children}
              <MobileMenu/>
            </Theme>
          </Providers>
      </body>
    </html>
  );
}
