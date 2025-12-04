/**
 * @format
 * @type {import('next').NextConfig}
 */

const path = require("path");

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    compress: true,
    poweredByHeader: false,

    images: {
        remotePatterns: [{
                protocol: "https",
                hostname: "**",
            },
            {
                protocol: "http",
                hostname: "**",
            },
        ],
    },

    webpack: (config, { isServer }) => {
        // Add path aliases
        config.resolve.alias = {
            ...config.resolve.alias,
            "@": path.resolve(__dirname, "src"),
        };
        return config;
    },

    headers: async() => {
        return [{
            source: "/api/:path*",
            headers: [{
                key: "Cache-Control",
                value: "no-store, no-cache, must-revalidate, proxy-revalidate",
            }, ],
        }, ];
    },

    rewrites: async() => {
        return {
            fallback: [{
                source: "/api/:path*",
                destination: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"}/:path*`,
            }, ],
        };
    },
};

module.exports = nextConfig;