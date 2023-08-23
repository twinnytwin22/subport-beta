/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');
dotenv.config();


const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,

    },
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: '/:user',
        destination: '/users/:user',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '053c144674e91fcc39bf3a56a7511a32.ipfscdn.io',
        },
      {
      protocol: 'https',
      hostname: 'ipfs.thirdwebcdn.com',
      },
      {
      protocol: 'https',
      hostname: 'qjfdpaecmjljkboepipm.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
        },
    ]
  },
  env:
   {
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    PK: process.env.PK
   },
  }


module.exports = nextConfig






