const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.discordapp.com', 'media.discordapp.net', 'puu.sh', 'i.imgur.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/valhabba',
        permanent: true,
      },
    ];
  },
};
