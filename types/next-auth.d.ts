import NextAuth, { DefaultSession } from "next-auth"
import type { User } from "@prisma/client"

export type UserData = User
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  export interface Session extends DefaultSession {
    // A JWT which can be used as Authorization header with supabase-js for RLS.
    supabaseAccessToken?: string | null;
    user: {
      /** The user's postal address. */
      address: string
    } & DefaultSession["user"]
  }
}


