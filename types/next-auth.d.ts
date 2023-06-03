import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    // A JWT which can be used as Authorization header with supabase-js for RLS.
    supabaseAccessToken?: string;
    id: string;
    user: {
      /** The user's postal address. */
      id: string;
      avatar_url: string;
      wallet_address: string;
      address: string;
    } & DefaultSession["user"];
  }
}
