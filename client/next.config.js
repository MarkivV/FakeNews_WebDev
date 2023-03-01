/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/brazhkovich/*',
      },
    ],
  },
  compiler: {
    removeConsole: false,
  },
  swcMinify: true
};

module.exports = nextConfig