/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.tvmaze.com",
        pathname: "/uploads/images/**",
      },
    ],
  },
};

module.exports = nextConfig;

// // next.config.js
// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: "/api/films",
//         destination: "https://ghibliapi.vercel.app/films",
//       },
//     ];
//   },
// };
