/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'webring.wonderful.software',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'drive.google.com',
                pathname: '**',
            }
        ],
    },
    // experimental: {
    //     missingSuspenseWithCSRBailout: false,
    // },
};

export default nextConfig;
