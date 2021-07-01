const queries = require('./src/utils/algolia');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: "Fathership.co — News, simplified 🚀",
    description: "Curated news from around the world for the discerning readers.",
    twitterHandle: "@fathershipco",
    siteUrl: "https://fathership.co",
    siteLanguage: "en",
    image: "./src/images/fathership.jpg",
    publisher: "Fathership",

  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-remove-generator`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-instagram-embed`,
    `gatsby-plugin-twitter`,
    `gatsby-remark-smarttypo`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-157324766-1",
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.GATSBY_ALGOLIA_ADMIN_KEY,
        indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
        queries,
        chunkSize: 10000,
      },
    },
    {
      resolve: "gatsby-remark-external-links",
      options: {
        target: "_blank",
        rel: "nofollow noopener noreferrer"
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Fathership.co — News, simplified.`,
        short_name: `Fathership`,
        description: `Curated news from around the world in bite-sized.`,
        lang: `en`,
        display: `standalone`,
        start_url: `/`,
        background_color: `#6b37bf`,
        theme_color: `#6b37bf`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
        crossOrigin: `anonymous`,
        cache_busting_mode: 'none',
      },
    },
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
        ],
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `fonts`,
        path: `${__dirname}/src/styles/fonts/`,
        // name: `images`,
        // path: `${__dirname}/src/images/`,
      }
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE,
            tableName: process.env.AIRTABLE_TABLE_NAME,
            tableView: process.env.AIRTABLE_TABLE_VIEW_NAME,
          },
          // We can add other bases/tables here, too!
          //{
            //baseId: `AIRTABLE_BASE_ID`,
            //tableName: `Sides`
          //}
        ]
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
                siteMetadata {
                  description
                  image
                  title
                  twitterHandle
                  publisher
                  siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allAirtable } }) => {
              return allAirtable.edges.map(edge => {
                return Object.assign({}, edge.node.data, {
                  feed_url: "https://fathership.co/rss.xml",
                  site_url: site.siteMetadata.siteUrl,
                  image_url: site.siteMetadata.image,
                  description: edge.node.data.excerpt,
                  date: edge.node.data.date,
                  author: edge.node.data.author,
                  url: site.siteMetadata.siteUrl + edge.node.data.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.data.slug,
                  custom_elements: [{ "content:encoded": edge.node.data.html }],
                })
              })
            },
            query: `
              {
                allAirtable(
                  sort: { order: DESC, fields: [data___date] },
                ) {
                  edges {
                    node {
                      data {
                          title
                          excerpt
                          author
                          date
                          slug
                        }
                      }
                    }
                  } 
              }
            `,
            output: "/rss.xml",
            feed_url: "https://fathership.co/rss.xml",
            generator: "Yo Mama",
            title: "Fathership",
            site_url: "https://fathership.co",
            managingEditor: "Fathership",
          },
        ],
      },
    }
  ],
}
