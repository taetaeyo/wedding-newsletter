module.exports = {
  siteMetadata: {
    title: `weddingNewsletter`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    'gatsby-plugin-vercel-deploy', 
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-react-helmet',  // SEO 관련 플러그인 추가 (선택 사항)
      options: {
        head: true, // 모든 페이지의 <head>에 대한 설정 허용
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',  // 사이트맵 생성을 위한 플러그인 추가 (선택 사항)
      options: {
        output: '/sitemap.xml',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',  // PWA 지원을 위한 플러그인 추가 (선택 사항)
      options: {
        name: 'Wedding Newsletter',
        short_name: 'WeddingNewsletter',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/icon.png',  // 아이콘 파일 경로 수정 필요
      },
    },
    'gatsby-link', // 누락된 패키지 추가
    'gatsby-react-router-scroll' // 누락된 패키지 추가
  ],
};
