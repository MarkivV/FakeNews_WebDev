/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['http://localhost:3000'],
  },
  env: {
    API_CONNECT_URL: process.env.API_CONNECT_URL,
  }
};