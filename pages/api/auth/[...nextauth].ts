import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import NextAuth, { getServerSession, NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken, signIn } from "next-auth/react";
import { SiweMessage } from "siwe";
import SpotifyProvider from "next-auth/providers/spotify";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "utils/prisma";




export function getAuthOptions(req: any, update?: boolean): NextAuthOptions {
  ////const adapter = PrismaAdapter(prisma)
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
        session.address = token?.sub;
        session.user = {
          wallet: token.sub.startsWith("0x") === true && token.sub,
          email: session?.user?.email,
          name: session?.user?.name
       
        };
        return session;
      },
      async signIn({ account, profile }: any) {
        if (account.provider === "google") {
          return profile.email_verified && profile.email.endsWith("@gmail.com")
        }
        return true // Do different verification for other providers that don't have `email_verified`
      },
      
    },
   //// adapter,
    providers,
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
    },
  };
}

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const authOptions = getAuthOptions(req);

  if (!Array.isArray(req.query.nextauth)) {
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
