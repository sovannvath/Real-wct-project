/** @type {import('next').NextConfig} */
const nextConfig = {

  typescript: {
    ignoreBuildErrors: true,
  }, 
  images: {
    domains: ['example.com'], // add your external image domains here
  },
}

module.exports = nextConfig 