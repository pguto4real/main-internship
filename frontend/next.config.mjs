/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Proxy API requests
        destination: 'http://localhost:7000/:path*', // External API endpoint
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)', // Apply headers globally
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    // Correct alias for project root
    config.resolve.alias['@'] = path.resolve('/'); // Project root
    
    return config;
  },
};

export default nextConfig;
