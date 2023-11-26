/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "data.otv.co.jp",
        port: "",
      },
      {
        protocol: "https",
        hostname: "flowbite.s3.amazonaws.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
