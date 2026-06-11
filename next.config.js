/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api',
        destination: 'http://localhost:3000'
      }
    ]
  },
  // experimental:{
  //   appDir: true
  // }
}

module.exports = nextConfig
