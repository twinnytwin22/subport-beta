/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env:
   {
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.NEXT_SUPABASE_ANON_KEY
   }
  }


module.exports = nextConfig




// Injected content via Sentry wizard below


