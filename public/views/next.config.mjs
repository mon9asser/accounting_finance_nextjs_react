/** @type {import('next').NextConfig} */
import os from 'os';

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
    async redirects() {

        var httpReq = await fetch("https://api.freeaccountingtutorial.com/redirects")
        var json = await httpReq.json();
        console.log(json);

        return [
            {
                source: '/map/:tut',
                destination: '/tutorials/php/:tut',
                permanent: true,
            }
        ]
    }    
};

export default nextConfig;
