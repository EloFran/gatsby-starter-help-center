const { isNil } = require('lodash')

const mapPagesUrls = {
  index: '/',
  history: '/history',
  info: '/info',
}
module.exports = {
  siteMetadata: {
    title: `Centro de Ayuda`,
    author: `EloFran`,
    // You'd normally use a description like
    // "Advice and answers by the MyCompany-Team"
    description: `Centro de Ayuda para buscar documentación`,
    siteUrl: `https://buscador.netlify.app/`,
    language: "es",
    texts: {
      allCollectionsText: "Todas las colecciones",
      searchPlaceholderText: "Comienza a buscar...",
      lastModifiedText: "Última Edición",
      publishedOnText: "Publicado el",
      writtenByText: "Escrito por",
      articlesInCollectionZeroText: "artículos en esta colección",
      articlesInCollectionOneText: "artículo en esta colección",
      articlesInCollectionTwoText: "artículos en esta colección",
      articlesInCollectionMultipleText: "artículos en esta colección",
    },
  },
  mapping: {
    "MarkdownRemark.frontmatter.author": `AuthorsYaml`,
    "MarkdownRemark.frontmatter.collection": `CollectionsYaml`,
  },
  plugins: [
    "gatsby-plugin-theme-ui",
    `gatsby-transformer-yaml`,
    `gatsby-plugin-sitemap`,
    "gatsby-plugin-simple-analytics",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `articles`,
      },
    },
    'gatsby-transformer-remark',
    {  
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'src',
      path: `${__dirname}/src/data/`,
    },
  },
    {
      resolve: 'gatsby-plugin-lunr',
      options: {
        // ISO 639-1 language codes. See https://lunrjs.com/guides/language_support.html for details
        languages: ['de'],   
        // Fields to index. If store === true value will be stored in index file. 
        // Attributes for custom indexing logic. See https://lunrjs.com/docs/lunr.Builder.html for details
        fields: [
          { name: 'title', store: true, attributes: { boost: 20 } },
          { name: 'description', store: true },
          { name: 'content', store: true },
          { name: 'url', store: true },
        ],
        // A function for filtering nodes. () => true by default
        filterNodes: (node) => !isNil(node.frontmatter),
        // How to resolve each field's value for a supported node type 
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields' values
          MarkdownRemark: {
            title: (node) => node.frontmatter.title,
            description: (node) => node.frontmatter.description,
            content: (node) => node.rawMarkdownBody,
            url: (node) => mapPagesUrls[node.frontmatter.templateKey],
          },
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data`,
        name: `mappings`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     //trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Help Center`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `assets/favicon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
