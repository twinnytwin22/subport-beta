import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import { getCsrfToken, getSession } from "next-auth/react";
import SpotifyProvider from "next-auth/providers/spotify";
import GoogleProvider from "next-auth/providers/google";
import { SupabaseAdapter } from '@next-auth/supabase-adapter'
import jwt from "jsonwebtoken"
import { supabase } from "lib/supabaseClient";
import { generateWallet } from "lib/hooks/generateWallet";
export function getAuthOptions(req: NextApiRequest, update?: boolean): NextAuthOptions {
  const providers = [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
    }),
  ];
  return {
    callbacks: {
      async session({ session, token, user }: any) {
        const signingSecret = process.env.SUPABASE_JWT_SECRET
        session.id = token?.sub
        // Check if wallet_address exists for this user
        let { data, error } = await supabase
          .from('users')
          .select('wallet_address')
          .eq('id', token.sub)
          .limit(1)
        
        if (error) {
          throw new Error(error.message)
        }

        // Generate a new wallet address for this user if it doesn't exist
        if (!data || !data.length || !data[0]?.wallet_address) {
          const walletAddress = await generateWallet()
          let { data, error } = await supabase
            .from('users')
            .upsert({
              id: token.sub,
              wallet_address: walletAddress.address
            })
            .eq('id', token.sub)
        
          if (error) {
            throw new Error(error.message)
          }
          session.user = {
            wallet_address: walletAddress,
            email: session?.user?.email,
            name: session?.user?.name,
            image: session?.user?.image,
            id: session?.user?.id
          };
        } else {
          session.user = {
            wallet_address: data[0]?.wallet_address,
            email: session?.user?.email,
            name: session?.user?.name,
            image: session?.user?.image,
            id: session?.user?.id
          };
        }

        if (signingSecret) {
          const payload = {
            aud: "authenticated",
            exp: Math.floor(new Date(session.expires).getTime() / 1000),
            sub: session?.user?.id,
            email: session?.user?.email,
            role: "authenticated",
          }
          session.supabaseAccessToken = jwt.sign(payload, signingSecret)
        }
        return session;
      },
      async signIn({ account, profile, email, user }: any) {
        if (await getSession({req})) {
          return true;
        }
        if (account.provider === 'spotify' && email.verificationRequest) {
          return true;
        }

        if (account.provider === "google") {
          return profile.email_verified && profile.email.endsWith("@gmail.com")
        }
        return true // Do different verification for other providers that don't have `email_verified`
      },
  
    },
    adapter: SupabaseAdapter({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      secret: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
    }),
    providers,
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
    },
  };
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const authOptions = getAuthOptions(req);

  if (!Array.isArray(req.query.nextauth
)) {
    res.status(400).send("Bad request");
    return;
  }
  const isDefaultSigninPage =
    req.method === "GET" &&
    req.query.nextauth.find((value) => value === "signin");

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    authOptions.providers.pop();
  }

  return await NextAuth(req, res, authOptions);
}
