/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    const backendOrigin = (process.env.AFTERCLASS_API_URL || 'http://localhost:8100').replace(/\/$/, '');
    return [
      { source: '/api/v1/:path*', destination: `${backendOrigin}/api/v1/:path*` },
      { source: '/api/clubs', destination: `${backendOrigin}/api/v1/clubs` },
      { source: '/api/auth/:path*', destination: `${backendOrigin}/api/v1/auth/:path*` },
      { source: '/api/dhanda', destination: `${backendOrigin}/api/v1/dhanda/listings` },
      { source: '/api/dhanda/:path*', destination: `${backendOrigin}/api/v1/dhanda/:path*` },
      { source: '/api/opportunities/:path*', destination: `${backendOrigin}/api/v1/opportunities/:path*` },
      { source: '/api/uploads/:path*', destination: `${backendOrigin}/api/v1/uploads/:path*` },
      { source: '/api/payments/:path*', destination: `${backendOrigin}/api/v1/payments/:path*` }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  }
};

export default nextConfig;


