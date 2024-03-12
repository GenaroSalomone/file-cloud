/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "chatty-raven-249.convex.cloud"
      }
    ]
  }
};

export default nextConfig;
