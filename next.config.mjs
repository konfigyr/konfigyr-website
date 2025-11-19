import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  redirects: async () => [{
    source: '/docs',
    destination: '/docs/getting-started/overview',
    permanent: true,
  }]
}

export default createMDX()(nextConfig)
