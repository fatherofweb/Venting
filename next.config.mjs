/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // All product/hero images are now local; serve modern formats for smaller payloads.
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
