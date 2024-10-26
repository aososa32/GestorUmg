/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";
const API_PROD = "http://localhost:3001/";
const API_DEV = "http://localhost:3001/";
const HOST_DEV = "http://localhost:3000"
const HOST_PROD = "http://localhost:3000"

const nextConfig = {
  //useFileSystemPublicRoutes: false,
  skipTrailingSlashRedirect: true,
  env: {
    API: isProd ? API_PROD : API_DEV,
    host: isProd ? HOST_PROD : HOST_DEV
  },
  /*async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/error/404",
      },
    ];
  },*/
};

module.exports = nextConfig;
