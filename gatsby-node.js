const path = require("path")
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)
const { paginate } = require(`gatsby-awesome-pagination`)

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions
    const blogListTemplate = path.resolve("src/pages/blog.js")
    const blogPostTemplate = path.resolve("src/templates/single-post.js")
    const tagTemplate = path.resolve("src/templates/tag.js")
    
    const result = await graphql(`{
        blogPosts: allAirtable(
            sort: {order: DESC, fields: data___date}
            limit: 2000
            filter: {data: {tags: {in: ["world", "singapore"]}}}
        ) {
            nodes {
                data {
                    title
                    slug
                    tags
                }
            }
        }
        postsRemark: allAirtable(
            sort: { order: DESC, fields: [data___date] }
            limit: 2000
        ) {
            nodes {
                data {
                    title
                    slug
                    tags
                }
            }
        }
        tagsGroup: allAirtable(limit: 2000) {
            group(field: data___tags) {
                fieldValue
            }
        }
    }`)

    // handle errors
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }

    const posts = result.data.postsRemark.nodes
    // Create post detail pages
    posts.forEach(({ data }, index) => {
        const slug = data.slug
        createPage({
            path: slug,      
            component: blogPostTemplate,
            context: { 
                slug: slug,
                prev: index === 0 ? null : posts[index - 1].data,
                next: index === (posts.length - 1) ? null : posts[index + 1].data,
                // tag: data.tags[0]
            },
        })
    })

    const blogPosts = result.data.blogPosts.nodes
    // Blog posts pagination
    const pathPrefix = ({ pageNumber, numberOfPages }) => pageNumber === 0 ? '/' : '/page'
    paginate({
        createPage,
        items: blogPosts,
        itemsPerPage: 8,
        itemsPerFirstPage: 8,
        pathPrefix: pathPrefix,
        component: blogListTemplate,
    })


    const tags = result.data.tagsGroup.group
    // Make tag pages
    tags.forEach(tag => {
        createPage({
            path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
            component: tagTemplate,
            context: {
                tag: tag.fieldValue,
            },
        })
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({ node, getNode })
        createNodeField({
            name: `slug`,
            node,
            value,
        })
    }
}
