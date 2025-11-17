import type { NextConfig } from 'next';
import { createMDX } from 'fumadocs-mdx/next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
}

export default createMDX()(nextConfig)
