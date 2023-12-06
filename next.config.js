/** @type {import('next').NextConfig} */

const withMDX = require('@next/mdx')();

const nextConfig = {
   transpilePackages: ['three'],
   reactStrictMode: true,
   pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
   webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
      config.module.rules.push({
         test: /\.(frag|vert|glsl)$/,
         use: ['raw-loader', 'glslify-loader'],
      });

      return config;
   },
   async rewrites() {
      return [
         {
            source: '/about',
            destination: '/projects/about',
         },
      ];
   },
};

module.exports = withMDX(nextConfig);
