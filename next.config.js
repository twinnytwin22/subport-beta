/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  env:
   {
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY
   }
  }


module.exports = nextConfig




// Injected content via Sentry wizard below


