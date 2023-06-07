import { NextAuthOptions } from "next-auth";
import { getSession } from "next-auth/react";
import SpotifyProvider from "next-auth/providers/spotify";
import GoogleProvider from "next-auth/providers/google";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import jwt from "jsonwebtoken";
import { getToken } from "next-auth/jwt";
import { supabase } from "lib/supabaseClient";
import { generateWallet } from "lib/hooks/generateWallet";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL as any;
const supaSecret = process.env.supabaseKey!;

const options = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
}


const secret = process.env.NEXTAUTH_SECRET;
export function getAuthOptions(): NextAuthOptions {
  const providers = [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
    }),
  ];
  return {
    callbacks: {
      async jwt({ token, user, session }) {
        if (user) {
          const u = user as unknown as any;
          return {
            ...token,
            id: u.id,
            supabaseAccessToken: session?.supabaseAccessToken,
          };
        }
        return token;
      },
      async session({ session, token, user }: any) {
        const signingSecret = process.env.SUPABASE_JWT_SECRET;

        session.id = token?.sub;
        // Check if wallet_address exists for this user
        let { data, error } = await supabase
          .from("users")
          .select("wallet_address")
          .eq("id", token.sub)
          .limit(1);

        if (error) {
          throw new Error(error.message);
        }

        // Generate a new wallet address for this user if it doesn't exist
        if (!data || !data.length || !data[0]?.wallet_address) {
          const walletAddress = await generateWallet();
          let { data, error } = await supabase
            .from("users")
            .upsert({
              id: token.sub,
              wallet_address: walletAddress.address,
            })
            .eq("id", token.sub);

          if (error) {
            throw new Error(error.message);
          }
          session.user = {
            wallet_address: walletAddress,
            email: session?.user?.email,
            name: session?.user?.name,
            image: session?.user?.image,
            id: session?.id,
          };
        } else {
          session.user = {
            wallet_address: data[0]?.wallet_address,
            email: session?.user?.email,
            name: session?.user?.name,
            image: session?.user?.image,
            id: session?.id,
          };
        }

        if (signingSecret) {
          const payload = {
            aud: "authenticated",
            exp: Math.floor(new Date(session.expires).getTime() / 1000),
            sub: session?.user?.id,
            email: session?.user?.email,
            role: "authenticated",
          };
          session.supabaseAccessToken = jwt.sign(payload, signingSecret);
        }
        return session;
      },
      async signIn({ account, profile, email, user }: any) {
        if (await getSession()) {
          return true;
        }
        if (account.provider === "spotify") {
          return true;
        }

        if (account.provider === "google") {
          return profile.email_verified && profile.email.endsWith("@gmail.com");
        }
        return true; // Do different verification for other providers that don't have `email_verified`
      },
    },
    adapter: SupabaseAdapter({
      url,
      secret: supaSecret,
      
    }),
    providers,
    secret: process.env.NEXTAUTH_SECRET,

    session: {
      strategy: "jwt",
    },
  };
}