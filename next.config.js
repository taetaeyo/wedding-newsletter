/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // React Strict Mode 활성화
    swcMinify: true,       // SWC 사용한 최소화 활성화
    compiler: {
        styledComponents: true, // styled-components 활성화
    },
};

module.exports = nextConfig;

const withImages = require('next-images');
module.exports = withImages();

