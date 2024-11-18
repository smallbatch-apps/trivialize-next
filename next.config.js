/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  crossOrigin: "anonymous",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wwdph2u4jby2ugf8.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
