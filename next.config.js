const withMDX = require('@next/mdx')()
const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
      }
    ]
  },
  experimental: {
    serverActions: true
  }
}

// Apply MDX configuration
const withMDXConfig = withMDX(nextConfig)

// Apply Sentry configuration
const sentryWebpackPluginOptions = {
  org: "techblitz",
  project: "javascript-nextjs",
  silent: true,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
}

// Export the final configuration
module.exports = withSentryConfig(withMDXConfig, sentryWebpackPluginOptions)
