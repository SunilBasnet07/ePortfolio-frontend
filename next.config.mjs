/** @type {import('next').NextConfig} */
const nextConfig = {
    
    images:{
        domains: ['res.cloudinary.com'],
        remotePatterns:[
            {
                protocol:"https",
                hostname:"res.cloudinary.com",
                pathname:"/djfop5zyp/**",
            },
            {
                protocol:"https",
                hostname:"via.placeholder.com",
            },
        ],
    },
};

export default nextConfig;
