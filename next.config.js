/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repoName = '/20XX-Love-Chronicles';

const nextConfig = {
  output: 'export',
  basePath: isProd ? repoName : '',
  assetPrefix: isProd ? repoName : '',
  images: {
    unoptimized: true, // Required for static export
  },
  // Disable server-side features for static export
  trailingSlash: true,
  // Expose base path to client-side code
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? repoName : '',
  },
}

module.exports = nextConfig
