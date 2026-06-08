/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'steelsoft.rs',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
}

export default nextConfig
