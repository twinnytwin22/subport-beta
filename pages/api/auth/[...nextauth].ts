import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";
import SpotifyProvider from "next-auth/providers/spotify";
import GoogleProvider from "next-auth/providers/google";
import { SupabaseAdapter } from '@next-auth/supabase-adapter'
import jwt from "jsonwebtoken"


export function getAuthOptions(req: any, update?: boolean): NextAuthOptions {
  const providers = [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const nURL = process.env.NEXTAUTH_URL as string;
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || "{}")
          );
          const nextAuthUrl = new URL(nURL);

          const result = await siwe.verify({
            signature: credentials?.signature || "",
            domain: nextAuthUrl.host,
            nonce: await getCsrfToken({ req }),
          });

          if (result.success) {
            return {
              id: siwe.address,
            };
          }
          return null;
        } catch (e) {
          return null;
        }
      },
      credentials: {
        message: {
          label: "Message",
          placeholder: "0x0",
          type: "text",
        },
        signature: {
          label: "Signature",
          placeholder: "0x0",
          type: "text",
        },
      },
      name: "Ethereum",
    }),
  ];

 


  return {
    callbacks: {
      async session({ session, token }: any) {
        const signingSecret = process.env.SUPABASE_JWT_SECRET
        session.id = token?.sub
        session.address = token?.sub.startsWith("0x") === true && token.sub;
        session.user = {
          wallet_address: token.sub.startsWith("0x") === true && token.sub,
          email: session?.user?.email,
          name: session?.user?.name,
          image: session?.user?.image
        };
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
      async signIn({ account, profile }: any) {
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
