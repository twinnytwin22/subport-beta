/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');
dotenv.config();

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'same-origin'
  },
  {
    key: 'Permissions-Policy',
    value:
      'accelerometer=(self), camera=(self), geolocation=(self), microphone=(self)'
  }
];

const mediaSecurityHeaders = [
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin'
  },
  {
    key: 'Cross-Origin-Embedder-Policy',
    value: 'require-corp'
  }
];

const nextConfig = {
  experimental: {
    // appDir: true,
  //  serverActions: true
    // instrumentationHook: true,
    // nextScriptWorkers: true,
  },
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: '/:user',
        destination: '/users/:user'
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '053c144674e91fcc39bf3a56a7511a32.ipfscdn.io'
      },
      {
        protocol: 'https',
        hostname: 'ipfs.thirdwebcdn.com'
      },
      {
        protocol: 'https',
        hostname: 'qjfdpaecmjljkboepipm.supabase.co'
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com'
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders
      },
      {
        source:
          '/(https://cdn.sanity.io|https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd|https://unpkg.com)',
        headers: mediaSecurityHeaders
      }
    ];
  },
  env: {
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    PK: process.env.PK
  }
};

module.exports = nextConfig;
