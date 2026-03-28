const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nazmulhasan.s3.us-east-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
        pathname: "/**",
      }
    ],
  },
};

module.exports = nextConfig;