/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');
dotenv.config();

require('cross-fetch');

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['cross-fetch'],

  env:
   {
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY
   }
  }


module.exports = nextConfig






