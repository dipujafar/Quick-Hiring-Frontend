const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nazmulhasan.s3.us-east-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;