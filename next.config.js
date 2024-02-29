/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  
  images: {
    unoptimized: true,
  },
  

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  i18n: {
    locales: ["en", "ja", "es", "pt", "fr"],
    defaultLocale: "en",
    localeDetection: false,
  },
  output:"standalone"
}

module.exports = nextConfig
