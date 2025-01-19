const createMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gravatar.com',
        port: '',
        pathname: '/avatar/**'
      },
      {
        protocol: 'https',
        hostname: 'img.shields.io',
        port: '',
        pathname: '/github/stars/**'
      },
      {
        protocol: 'https',
        hostname: 'lbycuccwrcmdaxjqyxut.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/features/roadmaps',
        destination: '/features/roadmap',
        permanent: true
      },
      {
        source: '/features/daily-challenges',
        destination: '/features/daily-coding-challenges',
        permanent: true
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'no-referrer-when-downgrade'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      },
      {
        source: '/embed/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self'"
          }
        ]
      }
    ];
  }
};

// Merge MDX config with Next.js config
module.exports = createMDX(nextConfig);
