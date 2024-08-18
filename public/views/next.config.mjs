/** @type {import('next').NextConfig} */
import os from 'os';

const nextConfig = { 
    trailingSlash: true,  
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                pathname: '/**',
            },
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
        var api_key = 'qwe#r$s%s&d*r!w*e((f))d-f`werh14445`4rt5`4ert5`4rt31645k132v132';
    
        try {
            var httHashReq = await fetch("http://localhost:1000/api/hash-request", {
                cache: 'force-cache',
                headers: {
                  "x-api-key": api_key,
                  "agent": 'User Agent Data'
                }
            });
    
            var hash_json = await httHashReq.json();
            //console.log('Hash Request Response:', hash_json);
    
            if(hash_json.is_error) {
                return [];
            }
    
            var token = hash_json.data;
    
            var redirect_http = await fetch("http://localhost:1000/api/redirects", {
                cache: 'force-cache',
                headers: {
                  "x-api-key": api_key,
                  "authorization": token
                }
            });
            
            var responseText = await redirect_http.text();
            console.log(responseText)
            //console.log('Redirects Response Text:', responseText);
    
            // Check if responseText is valid JSON
            try {
                var json = JSON.parse(responseText);
            } catch (error) {
                console.error('Failed to parse JSON:', error);
                return [];
            }
    
            if(json.is_error) {
                return [];
            }
    
            var redirects = json.data;
            if(!redirects.length) {
                return [];
            }
    
            redirects = redirects.map(x => { 
                return {
                    source: x.from,
                    destination: x.to,
                    permanent: parseInt(x.redirectType) == 301 ? true : false,
                };
            });
    
            return redirects;
    
        } catch (error) {
            console.error('Error in redirects function:', error);
            return [];
        }
    }    
};

export default nextConfig;
