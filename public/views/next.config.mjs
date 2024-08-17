/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,  
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'codedtag.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'freeaccountingtutorial.com',
                pathname: '/**',
            },
        ],
    },    
};

export default nextConfig;
