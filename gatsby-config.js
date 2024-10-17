module.exports = {
  siteMetadata: {
    title: `weddingNewsletter`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    'gatsby-plugin-vercel-deploy', 
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-react-helmet',
      options: {
        head: true,
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/sitemap.xml',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Wedding Newsletter',
        short_name: 'WeddingNewsletter',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/icon.png',
      },
    }
  ],
};
