/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/20XX-Love-Chronicles' : '',
  images: {
    unoptimized: true, // Required for static export
  },
  // Disable server-side features for static export
  trailingSlash: true,
}

module.exports = nextConfig
