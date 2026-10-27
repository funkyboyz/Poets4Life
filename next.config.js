export default {
  reactStrictMode: true,
  images: {
    domains: ['www.poets4life.com', 'studio.poets4life.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}