import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import SpotifyProvider from "next-auth/providers/spotify";
import { SupabaseAdapter } from '@next-auth/supabase-adapter';
import { supaKey } from 'lib/supabaseServer';
import jwt from "jsonwebtoken"


export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
          image: profile.image?.[0]?.url,
        }
      }
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    secret: supaKey as string,
  }),
  callbacks: {
    async session({ session, user }: any) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET
      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: "authenticated",
        }
        session.supabaseAccessToken = jwt.sign(payload, signingSecret)
      }
      return session
    },
  },
}

export default NextAuth(authOptions);