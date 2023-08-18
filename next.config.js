/** @type {import('next').NextConfig} */
const nextConfig = {
   transpilePackages: ['three'],
   reactStrictMode: true,
   webpack: (config, options) => {
      config.module.rules.push({
         test: /\.(frag|vert|glsl)$/,
         use: ['raw-loader', 'glslify-loader'],
      });
      return config;
   },
};

module.exports = nextConfig;
