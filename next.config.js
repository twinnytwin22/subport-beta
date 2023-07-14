/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');
dotenv.config();


const nextConfig = {
  experimental: {
    appDir: true,
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
      hostname: 'gateway.ipfscdn.io',
      },
      {
      protocol: 'https',
      hostname: 'qjfdpaecmjljkboepipm.supabase.co',
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






