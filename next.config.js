/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // React의 엄격 모드 활성화
    swcMinify: true,       // SWC를 사용한 최소화

    // 사이트 메타데이터 설정 (일반적으로는 별도의 파일에서 관리)
    publicRuntimeConfig: {
        siteTitle: 'weddingNewsletter',
        siteUrl: 'https://www.yourdomain.tld',
    },

    compiler: {
        styledComponents: true, // styled-components 활성화
    },
};

module.exports = nextConfig;
