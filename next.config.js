/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  eslint: {
    ignoreDuringBuilds: true,
  },

  async rewrites() {
    return [
      {
        source: '/api',
        destination: 'http://localhost:3000'
      }
    ]
  }
}

module.exports = nextConfig